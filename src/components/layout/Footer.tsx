// src/components/layout/Footer.tsx
import React from 'react';
import Link from 'next/link';
import { Calendar, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold tracking-tight">EventBook</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your premier destination for discovering and booking amazing events.
              Create unforgettable memories with EventBook.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/events" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Browse Events
              </Link>
              <Link href="/dashboard" className="block text-gray-300 hover:text-white transition-colors text-sm">
                My Dashboard
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors text-sm">
                About Us
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="space-y-2">
              <Link href="/help" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Help Center
              </Link>
              <Link href="/faq" className="block text-gray-300 hover:text-white transition-colors text-sm">
                FAQ
              </Link>
              <Link href="/terms" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/privacy" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300 text-sm">
                <Mail className="h-4 w-4" />
                <span>support@eventbook.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 text-sm">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 text-sm">
                <MapPin className="h-4 w-4" />
                <span>123 Event Street, City, State 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} EventBook. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
              Terms
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}