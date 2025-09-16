// src/app/admin/events/new/page.tsx
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventSchema } from '@/lib/utils/validation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

type EventFormData = {
  title: string;
  description: string;
  date: string;
  venue: string;
  price: number;
  totalSeats: number;
  category: string;
};

export default function CreateEventPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      price: 0,
      totalSeats: 100,
    },
  });

  const categoryValue = watch('category');

  // Redirect if not admin
  if (status !== 'loading' && (!session || session.user.role !== 'admin')) {
    router.push('/login');
    return null;
  }

  const onSubmit = async (data: EventFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Event created successfully!');
        router.push('/admin/events');
      } else {
        toast.error(result.message || 'Failed to create event');
        setError(result.message || 'Failed to create event');
      }
    } catch (error) {
      toast.error('An error occurred while creating the event');
      setError('An error occurred while creating the event');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/admin/events">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Event</h1>
        <p className="text-gray-600">Fill in the details to create a new event</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Information</CardTitle>
          <CardDescription>
            Enter all the required details for your event
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  placeholder="Amazing Concert 2025"
                  {...register('title')}
                />
                {errors.title && (
                  <p className="text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select onValueChange={(value) => setValue('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                    <SelectItem value="food">Food & Drink</SelectItem>
                    <SelectItem value="health">Health & Wellness</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-600">{errors.category.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your event in detail..."
                rows={4}
                {...register('description')}
              />
              {errors.description && (
                <p className="text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date">Event Date & Time *</Label>
                <Input
                  id="date"
                  type="datetime-local"
                  min={new Date().toISOString().slice(0, 16)}
                  {...register('date')}
                />
                {errors.date && (
                  <p className="text-sm text-red-600">{errors.date.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="venue">Venue *</Label>
                <Input
                  id="venue"
                  placeholder="Madison Square Garden, New York"
                  {...register('venue')}
                />
                {errors.venue && (
                  <p className="text-sm text-red-600">{errors.venue.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price">Ticket Price ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="25.00"
                  {...register('price', { valueAsNumber: true })}
                />
                {errors.price && (
                  <p className="text-sm text-red-600">{errors.price.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalSeats">Total Seats *</Label>
                <Input
                  id="totalSeats"
                  type="number"
                  min="1"
                  placeholder="100"
                  {...register('totalSeats', { valueAsNumber: true })}
                />
                {errors.totalSeats && (
                  <p className="text-sm text-red-600">{errors.totalSeats.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Event
              </Button>
              <Button type="button" variant="outline" asChild className="flex-1">
                <Link href="/admin/events">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}