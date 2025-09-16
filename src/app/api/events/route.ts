// src/app/api/events/route.ts
import { NextRequest } from 'next/server';
import connectDB from '@/lib/database/mongodb';
import Event from '@/models/Event';
import { eventSchema } from '@/lib/utils/validation';
import { successResponse, errorResponse } from '@/lib/utils/response';
import { requireAuth, requireAdmin } from '@/lib/utils/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    let query: any = {
      date: { $gte: new Date() }, // Only future events
      availableSeats: { $gt: 0 }, // Only events with available seats
    };
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { venue: { $regex: search, $options: 'i' } },
      ];
    }
    
    const events = await Event.find(query)
      .sort({ date: 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Event.countDocuments(query);
    
    return successResponse({
      events,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
    
  } catch (error) {
    console.error('Get events error:', error);
    return errorResponse('Failed to fetch events', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin();
    const body = await request.json();
    
    // Validate input
    const validatedData = eventSchema.parse(body);
    
    await connectDB();
    
    const event = new Event({
      ...validatedData,
      availableSeats: validatedData.totalSeats,
      createdBy: user.id,
    });
    
    await event.save();
    
    return successResponse(event, 'Event created successfully', 201);
    
  } catch (error: any) {
    console.error('Create event error:', error);
    
    if (error.message === 'Admin access required') {
      return errorResponse('Admin access required', 403);
    }
    
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.errors);
    }
    
    return errorResponse('Failed to create event', 500);
  }
}