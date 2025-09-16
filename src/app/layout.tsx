// src/app/layout.tsx
import { Inter } from 'next/font/google';
import { Providers } from '@/components/layout/Providers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'EventBook - Event Booking & Ticketing System',
  description: 'Book tickets for amazing events',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
          <Toaster
            position="top-right"
            richColors
            theme="light"
            toastOptions={{
              style: {
                background: '#10b981',
                color: 'white',
                border: 'none',
              },
              className: 'success-toast',
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
