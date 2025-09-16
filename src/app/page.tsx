"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Shield, Star, ArrowRight, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

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
}

const EventBookingLanding = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  // Fetch real events from database
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/events?limit=4');
        const data = await response.json();

        if (data.success) {
          setEvents(data.data.events);
        } else {
          console.error('Failed to fetch events:', data.message);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Event Enthusiast",
      content: "Absolutely seamless booking experience. Found amazing events I never would have discovered otherwise.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Tech Professional",
      content: "The platform is incredibly intuitive. Booked 5 events this month alone!",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "Creative Director",
      content: "Love how easy it is to filter and find exactly the type of events I'm interested in.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section with Unique Design */}
      <section className="relative min-h-screen bg-white overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-16 bg-black/10 transform rotate-45"
              style={{
                left: `${10 + (i * 12)}%`,
                top: `${20 + (i % 2) * 40}%`,
                animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Text Content */}
              <div className="space-y-8">
                {/* Animated Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-full animate-pulse">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping"></div>
                  Live Events Available
                </div>

                {/* Main Heading with Typewriter Effect */}
                <div className="space-y-4">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black leading-tight">
                    <span className="block">Book Your Next</span>
                    <span className="block relative">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-600 to-black">
                        Experience
                      </span>
                      <div className="absolute -bottom-2 left-0 h-1 bg-black w-32 animate-pulse"></div>
                    </span>
                  </h1>
                </div>

                <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
                  Discover and book tickets for concerts, conferences, workshops, and cultural events. 
                  Your gateway to unforgettable experiences starts here.
                </p>

                {/* Stats */}
                <div className="flex items-center space-x-8 py-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">500+</div>
                    <div className="text-sm text-gray-500">Events</div>
                  </div>
                  <div className="w-px h-12 bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">1K+</div>
                    <div className="text-sm text-gray-500">Happy Users</div>
                  </div>
                  <div className="w-px h-12 bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">2k+</div>
                    <div className="text-sm text-gray-500">Cities</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/events">
                    <Button
                      size="lg"
                      className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg group transition-all duration-300"
                    >
                      Explore Events
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg transition-all duration-300"
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Side - Interactive Visual */}
              <div className="relative lg:h-[600px] flex items-center justify-center">
                {/* Central Circle with Rotating Elements */}
                <div className="relative">
                  {/* Main Central Element */}
                  <div className="w-64 h-64 bg-black rounded-full flex items-center justify-center relative group cursor-pointer transform transition-transform duration-500 hover:scale-110">
                    <div className="text-white text-center">
                      <Calendar className="h-12 w-12 mx-auto mb-2" />
                      <div className="text-lg font-semibold">Book Now</div>
                    </div>
                    
                    {/* Pulse Animation */}
                    <div className="absolute inset-0 rounded-full bg-black opacity-20 animate-ping"></div>
                  </div>

                  {/* Orbiting Elements */}
                  {[
                    { icon: Users, label: "Community", angle: 0, distance: 140 },
                    { icon: MapPin, label: "Locations", angle: 72, distance: 140 },
                    { icon: Ticket, label: "Tickets", angle: 144, distance: 140 },
                    { icon: Star, label: "Reviews", angle: 216, distance: 140 },
                    { icon: Shield, label: "Secure", angle: 288, distance: 140 }
                  ].map((item, index) => {
                    const radian = (item.angle * Math.PI) / 180;
                    const x = Math.round(Math.cos(radian) * item.distance * 100) / 100;
                    const y = Math.round(Math.sin(radian) * item.distance * 100) / 100;

                    return (
                      <div
                        key={index}
                        className="absolute w-16 h-16 bg-white border-2 border-black rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-125 cursor-pointer group"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                          animation: `orbit 20s linear infinite`,
                          animationDelay: `${index * 0.5}s`
                        }}
                      >
                        <item.icon className="h-6 w-6 text-black group-hover:text-gray-600 transition-colors" />
                      </div>
                    );
                  })}
                </div>

                {/* Background Decorative Elements */}
                <div className="absolute inset-0 -z-10">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute border border-gray-200 rounded-full"
                      style={{
                        width: `${300 + i * 80}px`,
                        height: `${300 + i * 80}px`,
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        animation: `spin ${15 + i * 5}s linear infinite reverse`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-20 fill-gray-50">
            <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(-20px) rotate(45deg); }
        }
        @keyframes orbit {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(140px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(140px) rotate(-360deg); }
        }
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>

      {/* Featured Events Showcase */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6 tracking-tight">
              Featured Events
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover handpicked events happening near you
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-300"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {events.map((event) => (
                <Card 
                  key={event._id} 
                  className="overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-0 bg-white"
                  onMouseEnter={() => setHoveredEvent(event._id)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  <div className="relative overflow-hidden">
                    <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center transition-all duration-500 group-hover:from-blue-600 group-hover:to-purple-700">
                      <Calendar className="h-16 w-16 text-white opacity-60" />
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-black text-white capitalize">
                        {event.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/90 text-black">
                        ${event.price}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-black mb-2 group-hover:text-gray-700 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.venue}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {event.availableSeats} seats left
                      </div>
                    </div>
                    
                    <Link href={`/events/${event._id}`}>
                      <Button
                        className="w-full mt-4 bg-black text-white hover:bg-gray-800 transition-all duration-300"
                        variant={hoveredEvent === event._id ? "default" : "outline"}
                      >
                        <Ticket className="h-4 w-4 mr-2" />
                        Book Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* See More Button */}
          <div className="text-center mt-12">
            <Link href="/events">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg group transition-all duration-300"
              >
                See All Events
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Three simple steps to your next amazing experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Calendar,
                step: "01",
                title: "Discover",
                description: "Browse through thousands of curated events happening near you or anywhere in the world."
              },
              {
                icon: Ticket,
                step: "02", 
                title: "Book",
                description: "Secure your spot with our streamlined booking process. Pay safely and get instant confirmation."
              },
              {
                icon: Star,
                step: "03",
                title: "Experience",
                description: "Show up and enjoy! Access your tickets anytime through our mobile app."
              }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-12 w-12 text-black" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6 tracking-tight">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The most trusted platform for event booking
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Calendar,
                title: "Easy Booking",
                description: "Book tickets in just a few clicks with our streamlined process",
                color: "text-blue-600"
              },
              {
                icon: MapPin,
                title: "Global Events",
                description: "Discover events happening near you or anywhere in the world",
                color: "text-green-600"
              },
              {
                icon: Users,
                title: "Community",
                description: "Join thousands of event-goers and never miss great experiences",
                color: "text-purple-600"
              },
              {
                icon: Shield,
                title: "Secure",
                description: "Your tickets and payments are protected with bank-level security",
                color: "text-red-600"
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6 text-center group hover:shadow-lg transition-all duration-300 border-0 bg-gray-50 hover:bg-white">
                <feature.icon className={`h-12 w-12 ${feature.color} mb-4 mx-auto group-hover:scale-110 transition-transform`} />
                <CardTitle className="mb-3 text-black">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6 tracking-tight">
              What People Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don&apos;t just take our word for it
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 text-center border-0 bg-white hover:shadow-xl transition-all duration-300 group">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-600 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                <div className="font-bold text-black">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-500">
                  {testimonial.role}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Join thousands of users who trust us for their event bookings
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/events">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 text-lg px-12 py-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Browse Events
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-black hover:bg-white hover:text-black text-lg px-12 py-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </div>
        <hr className="my-12 border-t border-gray-700 w-[1240px] mx-auto" />
        <Footer />

      </section>

    </div>
  );
};

export default EventBookingLanding;