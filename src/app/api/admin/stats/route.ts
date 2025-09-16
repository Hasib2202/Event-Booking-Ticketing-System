// src/app/api/admin/stats/route.ts
import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/database/mongodb';
import Event from '@/models/Event';
import Booking from '@/models/Booking';
import { successResponse, errorResponse } from '@/lib/utils/response';
import { requireAdmin } from '@/lib/utils/auth';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();
    await connectDB();

    // Get total events
    const totalEvents = await Event.countDocuments();

    // Get upcoming events
    const upcomingEvents = await Event.countDocuments({
      date: { $gte: new Date() }
    });

    // Get total bookings
    const totalBookings = await Booking.countDocuments({
      bookingStatus: { $ne: 'cancelled' }
    });

    // Calculate total revenue
    const revenueResult = await Booking.aggregate([
      {
        $match: {
          bookingStatus: { $ne: 'cancelled' }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' }
        }
      }
    ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    const stats = {
      totalEvents,
      totalBookings,
      totalRevenue,
      upcomingEvents,
    };

    return successResponse(stats);

  } catch (error: any) {
    console.error('Get admin stats error:', error);

    if (error.message === 'Admin access required') {
      return errorResponse('Admin access required', 403);
    }

    return errorResponse('Failed to fetch admin stats', 500);
  }
}