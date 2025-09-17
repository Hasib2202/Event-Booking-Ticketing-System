// src/app/admin/events/[id]/edit/page.tsx
'use client';

import { useState, useEffect, use } from 'react';
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
import ImageUpload from '@/components/ui/image-upload';
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
  image?: string;
};

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
  category: string;
  image?: string;
}

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [error, setError] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  const categoryValue = watch('category');

  useEffect(() => {
    if (session?.user?.role === 'admin') {
      fetchEvent();
    }
  }, [id, session]);

  // Redirect if not admin
  if (status !== 'loading' && (!session || session.user.role !== 'admin')) {
    router.push('/login');
    return null;
  }

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/events/${id}`);
      const data = await response.json();

      if (data.success) {
        const eventData = data.data;
        setEvent(eventData);

        // Format date for datetime-local input
        const formattedDate = new Date(eventData.date).toISOString().slice(0, 16);

        reset({
          title: eventData.title,
          description: eventData.description,
          date: formattedDate,
          venue: eventData.venue,
          price: eventData.price,
          totalSeats: eventData.totalSeats,
          category: eventData.category,
          image: eventData.image || '',
        });
      } else {
        toast.error("Event not found");
        router.push('/admin/events');
      }
    } catch (error) {
      console.error('Failed to fetch event:', error);
      toast.error("Failed to load event details");
    } finally {
      setLoadingEvent(false);
    }
  };

  const onSubmit = async (data: EventFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Event updated successfully!');
        router.push('/admin/events');
      } else {
        toast.error(result.message || 'Failed to update event');
        setError(result.message || 'Failed to update event');
      }
    } catch (error) {
      toast.error('An error occurred while updating the event');
      setError('An error occurred while updating the event');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading' || loadingEvent) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
        <Link href="/admin/events">
          <Button>Back to Events</Button>
        </Link>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Event</h1>
        <p className="text-gray-600">Update the details for &quot;{event.title}&quot;</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Information</CardTitle>
          <CardDescription>
            Update the event details as needed
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
                <Select value={categoryValue} onValueChange={(value) => setValue('category', value)}>
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
                {event.totalSeats - event.availableSeats > 0 && (
                  <p className="text-sm text-amber-600">
                    Note: {event.totalSeats - event.availableSeats} tickets have already been booked.
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Event Image (Optional)</Label>
              <ImageUpload
                value={watch('image')}
                onChange={(imageUrl) => setValue('image', imageUrl || '')}
                disabled={isLoading}
              />
              <p className="text-sm text-gray-500">
                Upload an image to make your event more attractive to attendees.
              </p>
            </div>

            <div className="flex gap-4 pt-6">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Event
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