// src/app/api/bookings/route.ts
import { NextRequest } from 'next/server';
import connectDB from '@/lib/database/mongodb';
import Booking from '@/models/Booking';
import Event from '@/models/Event';
import User from '@/models/User';
import { bookingSchema } from '@/lib/utils/validation';
import { successResponse, errorResponse } from '@/lib/utils/response';
import { requireAuth } from '@/lib/utils/auth';
import { sendBookingConfirmationEmail } from '@/lib/utils/email';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const bookings = await Booking.find({ userId: user.id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    
    // Populate event data
    const bookingsWithEvents = await Promise.all(
      bookings.map(async (booking) => {
        const event = await Event.findById(booking.eventId);
        return {
          ...booking.toObject(),
          event,
        };
      })
    );
    
    const total = await Booking.countDocuments({ userId: user.id });
    
    return successResponse({
      bookings: bookingsWithEvents,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
    
  } catch (error: any) {
    console.error('Get bookings error:', error);
    
    if (error.message === 'Authentication required') {
      return errorResponse('Authentication required', 401);
    }
    
    return errorResponse('Failed to fetch bookings', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    
    // Validate input
    const validatedData = bookingSchema.parse(body);
    
    await connectDB();
    
    // Start transaction for atomic booking
    const session = await mongoose.startSession();
    let bookingData: any = null;
    let eventData: any = null;
    let userData: any = null;

    try {
      await session.withTransaction(async () => {
        // Get event and lock it
        const event = await Event.findById(validatedData.eventId).session(session);

        if (!event) {
          throw new Error('Event not found');
        }

        if (event.availableSeats < validatedData.numberOfTickets) {
          throw new Error('Not enough seats available');
        }

        if (event.date < new Date()) {
          throw new Error('Cannot book tickets for past events');
        }

        // Get user details for email
        const userDetails = await User.findById(user.id).session(session);
        if (!userDetails) {
          throw new Error('User not found');
        }

        // Calculate total amount
        const totalAmount = event.price * validatedData.numberOfTickets;

        // Create booking
        const booking = new Booking({
          userId: user.id,
          eventId: validatedData.eventId,
          numberOfTickets: validatedData.numberOfTickets,
          totalAmount,
          seats: validatedData.seats || [],
          bookingStatus: 'confirmed',
        });

        const savedBooking = await booking.save({ session });

        // Update available seats
        await Event.findByIdAndUpdate(
          validatedData.eventId,
          { $inc: { availableSeats: -validatedData.numberOfTickets } },
          { session }
        );

        // Store data for email sending
        bookingData = savedBooking;
        eventData = event;
        userData = userDetails;
      });

      // Send confirmation email (outside transaction to avoid blocking)
      if (bookingData && eventData && userData) {
        try {
          await sendBookingConfirmationEmail({
            userEmail: userData.email,
            userName: userData.name,
            eventTitle: eventData.title,
            eventDate: eventData.date.toISOString(),
            eventVenue: eventData.venue,
            numberOfTickets: bookingData.numberOfTickets,
            totalAmount: bookingData.totalAmount,
            bookingId: bookingData._id.toString(),
          });
        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError);
          // Don't fail the booking if email fails
        }
      }

      return successResponse(null, 'Booking successful', 201);

    } finally {
      await session.endSession();
    }
    
  } catch (error: any) {
    console.error('Create booking error:', error);
    
    if (error.message === 'Authentication required') {
      return errorResponse('Authentication required', 401);
    }
    
    if (error.message === 'Event not found') {
      return errorResponse('Event not found', 404);
    }
    
    if (error.message === 'Not enough seats available') {
      return errorResponse('Not enough seats available', 400);
    }
    
    if (error.message === 'Cannot book tickets for past events') {
      return errorResponse('Cannot book tickets for past events', 400);
    }
    
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.errors);
    }
    
    return errorResponse('Failed to create booking', 500);
  }
}