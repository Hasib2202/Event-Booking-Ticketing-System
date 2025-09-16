// src/lib/utils/validation.ts
import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.string().refine((date) => new Date(date) > new Date(), {
    message: 'Event date must be in the future',
  }),
  venue: z.string().min(1, 'Venue is required'),
  price: z.number().min(0, 'Price must be positive'),
  totalSeats: z.number().min(1, 'Must have at least 1 seat'),
  category: z.string().min(1, 'Category is required'),
  image: z.string().optional(),
});

export const bookingSchema = z.object({
  eventId: z.string().min(1, 'Event ID is required'),
  numberOfTickets: z.number().min(1, 'Must book at least 1 ticket'),
  seats: z.array(z.string()).optional(),
});