// src/components/layout/Footer.tsx
import Link from 'next/link';
import { Calendar, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-3">
              <Calendar className="h-12 w-12 text-white" />
              <span className="text-3xl font-bold text-white tracking-tight">EventBook</span>
            </Link>
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Connecting people through amazing events. Find, create, and share your next unforgettable experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white tracking-wide mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/events" className="text-gray-300 hover:text-white text-lg transition-colors duration-200">
                  All Events
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-white text-lg transition-colors duration-200">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white text-lg transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white text-lg transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-bold text-white tracking-wide mb-6">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-200 transform hover:scale-110">
                <Facebook className="h-8 w-8" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-200 transform hover:scale-110">
                <Twitter className="h-8 w-8" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-200 transform hover:scale-110">
                <Instagram className="h-8 w-8" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400 text-lg">
            &copy; {new Date().getFullYear()} EventBook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}