// src/app/events/[id]/page.tsx
'use client';

import { useState, useEffect, use } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar, MapPin, DollarSign, Users, ArrowLeft, Clock, Info } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { toast } from '@/lib/utils/toast';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  category: string;
  image?: string;
}

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [tickets, setTickets] = useState(1);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/events/${id}`);
      const data = await response.json();

      if (data.success) {
        setEvent(data.data);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Event not found",
        });
        router.push('/events');
      }
    } catch (error) {
      console.error('Failed to fetch event:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load event details",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!session) {
      router.push('/login');
      return;
    }

    setBooking(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: id,
          numberOfTickets: tickets,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success!",
          description: `Successfully booked ${tickets} ticket(s) for ${event?.title}`,
        });
        // Refresh event data
        fetchEvent();
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        toast({
          variant: "destructive",
          title: "Booking Failed",
          description: data.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to book tickets",
      });
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
        <Link href="/events">
          <Button>Back to Events</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link href="/events">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Button>
      </Link>

      {/* Event Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
          <Badge className="ml-4 text-sm">{event.category}</Badge>
        </div>

        {/* Event Image */}
        <div className="h-64 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-6 overflow-hidden">
          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <Calendar className="h-24 w-24 text-white opacity-50" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Event Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600 leading-relaxed">{event.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-3 text-blue-600" />
                  <div>
                    <p className="font-medium">Date & Time</p>
                    <p className="text-sm">{format(new Date(event.date), 'EEEE, MMMM dd, yyyy')}</p>
                    <p className="text-sm">{format(new Date(event.date), 'h:mm a')}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-3 text-green-600" />
                  <div>
                    <p className="font-medium">Venue</p>
                    <p className="text-sm">{event.venue}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <DollarSign className="h-5 w-5 mr-3 text-purple-600" />
                  <div>
                    <p className="font-medium">Price</p>
                    <p className="text-sm">${event.price} per ticket</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-3 text-orange-600" />
                  <div>
                    <p className="font-medium">Availability</p>
                    <p className="text-sm">{event.availableSeats} of {event.totalSeats} seats available</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Card */}
        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Book Tickets</CardTitle>
              <CardDescription>
                Secure your spot at this amazing event
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {event.availableSeats === 0 ? (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    This event is sold out. No tickets available.
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  <div className="space-y-2">
                    <label htmlFor="tickets" className="text-sm font-medium">
                      Number of Tickets
                    </label>
                    <Input
                      id="tickets"
                      type="number"
                      min="1"
                      max={Math.min(10, event.availableSeats)}
                      value={tickets.toString()}
                      onChange={(e) => setTickets(parseInt(e.target.value) || 1)}
                    />
                    <p className="text-xs text-gray-500">
                      Maximum {Math.min(10, event.availableSeats)} tickets per booking
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Tickets ({tickets}x)</span>
                      <span className="text-sm font-medium">${event.price * tickets}</span>
                    </div>
                    <div className="flex justify-between items-center font-semibold">
                      <span>Total</span>
                      <span>${event.price * tickets}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleBooking}
                    disabled={booking}
                    className="w-full"
                  >
                    {booking ? 'Booking...' : `Book ${tickets} Ticket${tickets > 1 ? 's' : ''}`}
                  </Button>

                  {!session && (
                    <p className="text-xs text-gray-500 text-center">
                      You need to <Link href="/login" className="text-blue-600 hover:underline">sign in</Link> to book tickets
                    </p>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}