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

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Headless UI components
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Sonner** - Toast notifications
- **Lucide React** - Icons

### Backend
- **Next.js API Routes** - Server-side API
- **NextAuth.js** - Authentication
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Image storage
- **Nodemailer** - Email service

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
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/event-booking-system

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

## 🎯 Key Features Implemented

### User Experience
- **Modern Landing Page**: Hero section with featured events and testimonials
- **Advanced Search & Filtering**: Search by title, filter by category
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Real-time Updates**: Seat availability updates instantly
- **Toast Notifications**: Immediate feedback for all user actions

### Admin Features
- **Event Management**: Full CRUD operations with image upload
- **Dashboard Statistics**: Overview of events, bookings, and revenue
- **Role-based Access**: Secure admin-only routes and functions

### Technical Excellence
- **Type Safety**: Full TypeScript implementation
- **Form Validation**: Comprehensive validation with helpful error messages
- **Error Handling**: Graceful error handling throughout the application
- **Security**: JWT authentication, password hashing, input validation
- **Performance**: Optimized images, efficient database queries, pagination

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

## 🎉 What's Next?

The application is production-ready with all core and bonus features implemented. Potential enhancements could include:

- **Seat Selection UI**: Visual seat picker (models already implemented)
- **Payment Integration**: Stripe/PayPal integration
- **Social Login**: Google/Facebook authentication
- **Event Reviews**: User ratings and reviews
- **QR Code Tickets**: Digital ticket generation
- **Push Notifications**: Real-time updates
- **Analytics Dashboard**: Advanced reporting

## 🤝 Contributing

This is a portfolio project demonstrating full-stack development capabilities. The codebase follows best practices and is well-documented for easy understanding and extension.

## 📄 License

This project is created for educational and portfolio purposes.

---

**Built with ❤️ using Next.js, React, and MongoDB**