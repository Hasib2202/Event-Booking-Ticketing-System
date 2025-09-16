// src/app/api/events/[id]/route.ts
import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/database/mongodb';
import Event from '@/models/Event';
import { eventSchema } from '@/lib/utils/validation';
import { successResponse, errorResponse } from '@/lib/utils/response';
import { requireAdmin } from '@/lib/utils/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const event = await Event.findById(id);
    if (!event) {
      return errorResponse('Event not found', 404);
    }
    
    return successResponse(event);
    
  } catch (error) {
    console.error('Get event error:', error);
    return errorResponse('Failed to fetch event', 500);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const body = await request.json();
    const { id } = await params;

    // Validate input
    const validatedData = eventSchema.parse(body);

    await connectDB();

    const event = await Event.findById(id);
    if (!event) {
      return errorResponse('Event not found', 404);
    }
    
    // Update available seats if total seats changed
    if (validatedData.totalSeats !== event.totalSeats) {
      const bookedSeats = event.totalSeats - event.availableSeats;
      validatedData.availableSeats = Math.max(0, validatedData.totalSeats - bookedSeats);
    }
    
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      validatedData,
      { new: true, runValidators: true }
    );
    
    return successResponse(updatedEvent, 'Event updated successfully');
    
  } catch (error: any) {
    console.error('Update event error:', error);
    
    if (error.message === 'Admin access required') {
      return errorResponse('Admin access required', 403);
    }
    
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.errors);
    }
    
    return errorResponse('Failed to update event', 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    await connectDB();

    const event = await Event.findById(id);
    if (!event) {
      return errorResponse('Event not found', 404);
    }

    await Event.findByIdAndDelete(id);
    
    return successResponse(null, 'Event deleted successfully');
    
  } catch (error: any) {
    console.error('Delete event error:', error);
    
    if (error.message === 'Admin access required') {
      return errorResponse('Admin access required', 403);
    }
    
    return errorResponse('Failed to delete event', 500);
  }
}