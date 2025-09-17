# Event Booking & Ticketing System

A full-stack event booking and ticketing platform built with Next.js, React, and MongoDB. This system allows users to discover, book, and manage event tickets while providing administrators with comprehensive event management capabilities.

## 🚀 Live Demo

[Add your deployed link here]

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Running the Application](#-running-the-application)
- [Demo Credentials](#-demo-credentials)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)

## ✨ Features

### Core Features ✅

- **User Authentication**: Secure login/register system using NextAuth.js with JWT tokens
- **Event List Page**: Browse all available events with filtering by category and search
- **Event Detail Page**: Detailed event information with booking functionality
- **Booking System**: Complete ticket booking with real-time seat availability updates
- **User Dashboard**: Personal dashboard to view and manage all booked tickets
- **Backend API**: RESTful API with full CRUD operations for events and bookings
- **Database Integration**: MongoDB with Mongoose ODM for data persistence

### Bonus Features ✅

- **Seat Management System**: Complete seat tracking and booking infrastructure (models ready)
- **Role-based Access Control**: Admin panel for event management (create, edit, delete events)
- **Email Notifications**: Automated booking confirmation and cancellation emails
- **Image Upload**: Cloudinary integration for event image management
- **Responsive Design**: Modern, mobile-first UI with Tailwind CSS
- **Form Validation**: Comprehensive validation using Zod and React Hook Form
- **Toast Notifications**: User-friendly feedback with Sonner
- **Advanced UI Components**: Custom components built with Radix UI

## 🛠 Complete Technology Stack

### Frontend Technologies

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling framework
- **Shadcn/ui** - Modern UI component library built on Radix UI
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Sonner** - Toast notifications
- **Lucide React** - Icons
- **date-fns** - Date utilities

### Backend & Database

- **Next.js API Routes** - Server-side API
- **NextAuth.js** - Authentication
- **MongoDB** - Database
- **Mongoose** - ODM
- **bcryptjs** - Password hashing
- **JWT** - Token-based authentication

### Cloud Services

- **Cloudinary** - Image storage
- **Nodemailer** - Email service
- **Vercel** - Deployment platform

### Development Tools

- **ESLint** - Code linting
- **TypeScript** - Type checking
- **dotenv** - Environment variables

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image uploads)
- Email service credentials (Gmail/SMTP)

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd event-booking-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your environment variables (see [Environment Variables](#environment-variables))

4. **Seed the database**

   ```bash
   npm run seed
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
MONGODB_URI=your-mongodb-uri-here

# NextAuth
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# JWT
JWT_SECRET=your-jwt-secret

# Email Service
EMAIL_FROM=noreply@yourdomain.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 🗄 Database Setup

The application uses MongoDB with the following collections:

### Events Collection

```javascript
{
  title: String,
  description: String,
  date: Date,
  venue: String,
  price: Number,
  totalSeats: Number,
  availableSeats: Number,
  category: String,
  image: String,
  createdBy: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Users Collection

```javascript
{
  name: String,
  email: String,
  password: String,
  role: String, // 'user' or 'admin'
  createdAt: Date,
  updatedAt: Date
}
```

### Bookings Collection

```javascript
{
  eventId: String,
  userId: String,
  numberOfTickets: Number,
  totalAmount: Number,
  status: String, // 'confirmed' or 'cancelled'
  createdAt: Date,
  updatedAt: Date
}
```

### Seats Collection (Ready for seat selection feature)

```javascript
{
  eventId: String,
  seatNumber: String,
  row: String,
  section: String,
  isBooked: Boolean,
  bookedBy: String,
  bookingId: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

### Other Scripts

```bash
# Seed database with sample data
npm run seed

# Type checking
npm run type-check

# Linting
npm run lint
```

## 👤 Demo Credentials

After running the seed script, use these credentials to test the application:

### Admin Account

- **Email**: admin@eventbook.com
- **Password**: admin123

### User Accounts

- **Email**: john@example.com / **Password**: user123
- **Email**: jane@example.com / **Password**: user123

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (login, register)
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── events/        # Events CRUD
│   │   ├── bookings/      # Bookings CRUD
│   │   ├── upload/        # Image upload
│   │   └── admin/         # Admin stats
│   ├── dashboard/         # User dashboard
│   ├── events/            # Event pages
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   └── layout/           # Layout components
├── lib/                  # Utility libraries
│   ├── auth/             # Authentication utilities
│   ├── database/         # Database connection
│   └── utils/            # Helper functions
├── models/               # Database models
├── types/                # TypeScript type definitions
└── styles/               # Additional styles

scripts/
├── seed.js               # Database seeding script
└── update-images.js      # Image update utility
```

## 📡 API Documentation

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### Events

- `GET /api/events` - Fetch all events (with pagination, search, filters)
- `POST /api/events` - Create new event (admin only)
- `GET /api/events/[id]` - Fetch single event
- `PUT /api/events/[id]` - Update event (admin only)
- `DELETE /api/events/[id]` - Delete event (admin only)

### Bookings

- `GET /api/bookings` - Fetch user bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/[id]` - Fetch single booking
- `DELETE /api/bookings/[id]` - Cancel booking

### Admin

- `GET /api/admin/stats` - Dashboard statistics

### Upload

- `POST /api/upload` - Upload event images

## 🎯 Assignment Requirements Status

### ✅ Core Features (COMPLETED)

- **User Authentication**: ✅ JWT with NextAuth.js - Complete authentication system with secure login/logout
- **Event List Page**: ✅ Displays all events with title, date, venue, price - Enhanced with search and filtering
- **Event Detail Page**: ✅ Shows complete event information with ticket booking functionality
- **Booking System**: ✅ Real-time seat deduction using atomic MongoDB transactions
- **User Dashboard**: ✅ Complete list of all user bookings with management capabilities
- **Backend API**: ✅ Full RESTful API with CRUD operations for events and bookings
- **Database Integration**: ✅ MongoDB with Mongoose ODM - Complete schema design and relationships

### ✅ Bonus Features (COMPLETED)

- **Seat Selection Infrastructure**: ✅ Complete seat model and database schema ready for UI implementation
- **Role-based Access Control**: ✅ Full admin panel with event management (add/update/delete events)
- **Email Confirmation**: ✅ Beautiful HTML email templates for booking confirmations and cancellations
- **Cloud Deployment Ready**: ✅ Configured for Vercel deployment with environment variables

### 🚀 Additional Features Implemented

- **Image Upload System**: Cloudinary integration with automatic optimization
- **Advanced Security**: Route-based middleware protection and input validation
- **Modern UI/UX**: Responsive design with Radix UI components and Tailwind CSS
- **Form Management**: React Hook Form with Zod validation schemas
- **Toast Notifications**: Real-time user feedback with Sonner
- **Database Seeding**: Comprehensive seed script with realistic demo data
- **TypeScript**: Full type safety throughout the application
- **Error Handling**: Graceful error boundaries and user-friendly error messages

## 🚀 Deployment

The application is ready to be deployed on platforms like Vercel, Netlify, or Railway.

### Deploy on Vercel (Recommended)

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**

   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy!

3. **Environment Variables for Production**
   Make sure to set all environment variables in your deployment platform:
   - Database connection strings
   - Authentication secrets
   - Email service credentials
   - Cloudinary configuration

### Manual Deployment Steps

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Set production environment variables**

3. **Deploy to your hosting platform**

## 🎯 Development Approach & Assumptions

### Key Decisions

- **Full-Stack Next.js**: Chosen for integrated frontend/backend development
- **MongoDB**: NoSQL database for flexible event and booking data
- **Shadcn/ui**: Modern component library for consistent UI design
- **TypeScript**: Full type safety across the application

### Deployment

- **Platform**: Deployed on Vercel for optimal Next.js performance
- **Database**: MongoDB Atlas for production database hosting
- **Images**: Cloudinary for optimized image storage and delivery
- **Email**: SMTP service integration for booking notifications

## 📄 License & Usage

This project is created for educational and portfolio purposes, demonstrating full-stack development capabilities with modern web technologies.

---

**Built with ❤️ using Next.js, React, and MongoDB**
