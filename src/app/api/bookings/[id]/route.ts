// src/app/api/bookings/[id]/route.ts
import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/database/mongodb';
import Booking from '@/models/Booking';
import Event from '@/models/Event';
import User from '@/models/User';
import { successResponse, errorResponse } from '@/lib/utils/response';
import { requireAuth } from '@/lib/utils/auth';
import { sendBookingCancellationEmail } from '@/lib/utils/email';
import mongoose from 'mongoose';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    const { id } = await params;

    await connectDB();

    // Start transaction for atomic cancellation
    const session = await mongoose.startSession();
    let bookingData: any = null;
    let eventData: any = null;
    let userData: any = null;

    try {
      await session.withTransaction(async () => {
        const booking = await Booking.findById(id).session(session);

        if (!booking) {
          throw new Error('Booking not found');
        }

        if (booking.userId !== user.id) {
          throw new Error('Unauthorized');
        }

        if (booking.bookingStatus === 'cancelled') {
          throw new Error('Booking already cancelled');
        }

        const event = await Event.findById(booking.eventId).session(session);
        if (!event) {
          throw new Error('Event not found');
        }

        // Check if cancellation is allowed (e.g., before event date)
        if (event.date <= new Date()) {
          throw new Error('Cannot cancel tickets for past or ongoing events');
        }

        // Get user details for email
        const userDetails = await User.findById(user.id).session(session);
        if (!userDetails) {
          throw new Error('User not found');
        }

        // Update booking status
        await Booking.findByIdAndUpdate(
          id,
          { bookingStatus: 'cancelled' },
          { session }
        );

        // Restore available seats
        await Event.findByIdAndUpdate(
          booking.eventId,
          { $inc: { availableSeats: booking.numberOfTickets } },
          { session }
        );

        // Store data for email sending
        bookingData = booking;
        eventData = event;
        userData = userDetails;
      });

      // Send cancellation email (outside transaction to avoid blocking)
      if (bookingData && eventData && userData) {
        try {
          await sendBookingCancellationEmail({
            userEmail: userData.email,
            userName: userData.name,
            eventTitle: eventData.title,
            eventDate: eventData.date.toISOString(),
            numberOfTickets: bookingData.numberOfTickets,
            bookingId: bookingData._id.toString(),
          });
        } catch (emailError) {
          console.error('Failed to send cancellation email:', emailError);
          // Don't fail the cancellation if email fails
        }
      }

      return successResponse(null, 'Booking cancelled successfully');

    } finally {
      await session.endSession();
    }
    
  } catch (error: any) {
    console.error('Cancel booking error:', error);
    
    if (error.message === 'Authentication required') {
      return errorResponse('Authentication required', 401);
    }
    
    if (error.message === 'Booking not found') {
      return errorResponse('Booking not found', 404);
    }
    
    if (error.message === 'Unauthorized') {
      return errorResponse('Unauthorized', 403);
    }
    
    if (error.message === 'Booking already cancelled') {
      return errorResponse('Booking already cancelled', 400);
    }
    
    if (error.message === 'Cannot cancel tickets for past or ongoing events') {
      return errorResponse('Cannot cancel tickets for past or ongoing events', 400);
    }
    
    return errorResponse('Failed to cancel booking', 500);
  }
}