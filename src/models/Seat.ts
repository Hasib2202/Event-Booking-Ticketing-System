// src/models/Seat.ts (for bonus feature)
import mongoose, { Schema, Model } from 'mongoose';
import { ISeat } from '@/types';

const SeatSchema = new Schema<ISeat>({
  eventId: {
    type: String,
    required: [true, 'Event ID is required'],
  },
  seatNumber: {
    type: String,
    required: [true, 'Seat number is required'],
  },
  row: {
    type: String,
    required: [true, 'Row is required'],
  },
  section: {
    type: String,
    default: 'General',
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  bookedBy: {
    type: String,
    default: null,
  },
  bookingId: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

// Compound index to ensure unique seats per event
SeatSchema.index({ eventId: 1, seatNumber: 1, row: 1 }, { unique: true });

const Seat: Model<ISeat> = mongoose.models.Seat || mongoose.model<ISeat>('Seat', SeatSchema);

export default Seat;
