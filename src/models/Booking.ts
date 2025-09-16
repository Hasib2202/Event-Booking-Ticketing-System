// src/models/Booking.ts
import mongoose, { Schema, Model } from 'mongoose';
import { IBooking } from '@/types';

const BookingSchema = new Schema<IBooking>({
  userId: {
    type: String,
    required: [true, 'User ID is required'],
  },
  eventId: {
    type: String,
    required: [true, 'Event ID is required'],
  },
  numberOfTickets: {
    type: Number,
    required: [true, 'Number of tickets is required'],
    min: [1, 'Must book at least 1 ticket'],
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Amount cannot be negative'],
  },
  bookingStatus: {
    type: String,
    enum: ['confirmed', 'cancelled', 'pending'],
    default: 'confirmed',
  },
  seats: [{
    type: String,
  }],
  bookingDate: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Index for better performance
BookingSchema.index({ userId: 1, eventId: 1 });
BookingSchema.index({ bookingStatus: 1 });

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
