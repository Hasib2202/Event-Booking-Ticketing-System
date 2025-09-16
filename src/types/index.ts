// src/types/index.ts
import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface IEvent extends Document {
  _id: string;
  title: string;
  description: string;
  date: Date;
  venue: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
  category: string;
  image?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBooking extends Document {
  _id: string;
  userId: string;
  eventId: string;
  numberOfTickets: number;
  totalAmount: number;
  bookingStatus: 'confirmed' | 'cancelled' | 'pending';
  seats?: string[];
  bookingDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISeat extends Document {
  _id: string;
  eventId: string;
  seatNumber: string;
  row: string;
  section: string;
  isBooked: boolean;
  bookedBy?: string;
  bookingId?: string;
}