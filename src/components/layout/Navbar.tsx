// src/components/layout/Navbar.tsx
'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Menu, X, Calendar, User, Settings, LogOut } from 'lucide-react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Calendar className="h-10 w-10 text-black" />
              <span className="text-2xl font-bold text-black tracking-tight">EventBook</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/events"
              className="text-black hover:text-gray-600 px-4 py-2 text-lg font-semibold transition-colors duration-200"
            >
              Events
            </Link>

            {status === 'loading' ? (
              <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="text-black hover:text-gray-600 px-4 py-2 text-lg font-semibold transition-colors duration-200"
                >
                  Dashboard
                </Link>

                {session.user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="text-black hover:text-gray-600 px-4 py-2 text-lg font-semibold transition-colors duration-200"
                  >
                    Admin
                  </Link>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {session.user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <Button variant="ghost" className="text-lg font-semibold text-black hover:text-gray-600 hover:bg-gray-50">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button className="text-lg font-semibold bg-black text-white hover:bg-gray-800 px-6 py-2">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <Link
                href="/events"
                className="text-black hover:text-gray-600 block px-4 py-3 text-lg font-semibold transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>

              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-black hover:text-gray-600 block px-4 py-3 text-lg font-semibold transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>

                  {session.user.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="text-black hover:text-gray-600 block px-4 py-3 text-lg font-semibold transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  )}

                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="w-full justify-start px-4 py-3 text-lg font-semibold text-black hover:text-gray-600 hover:bg-gray-50"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-black hover:text-gray-600 block px-4 py-3 text-lg font-semibold transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="text-black hover:text-gray-600 block px-4 py-3 text-lg font-semibold transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}