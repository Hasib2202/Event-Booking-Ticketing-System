// scripts/seed.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

// MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/event-booking-system';

// User Schema (simplified for seeding)
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Event Schema (simplified for seeding)
const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  venue: String,
  price: Number,
  totalSeats: Number,
  availableSeats: Number,
  category: String,
  createdBy: String,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

// Seed data
const seedUsers = [
  {
    name: 'Admin User',
    email: 'admin@eventbook.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'user123',
    role: 'user',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'user123',
    role: 'user',
  },
];

// Create future dates relative to current date
const now = new Date();
const addDays = (days) => new Date(now.getTime() + (days * 24 * 60 * 60 * 1000));

const seedEvents = [
  {
    title: 'Summer Music Festival 2025',
    description: 'Join us for an amazing summer music festival featuring top artists from around the world. Experience live performances, great food, and unforgettable memories.',
    date: addDays(30), // 30 days from now
    venue: 'Central Park, New York',
    price: 75.00,
    totalSeats: 5000,
    availableSeats: 5000,
    category: 'music',
  },
  {
    title: 'Tech Innovation Conference',
    description: 'Discover the latest in technology innovation with industry leaders sharing insights on AI, blockchain, and future trends.',
    date: addDays(45), // 45 days from now
    venue: 'Silicon Valley Convention Center',
    price: 150.00,
    totalSeats: 500,
    availableSeats: 500,
    category: 'technology',
  },
  {
    title: 'Basketball Championship Finals',
    description: 'Watch the most exciting basketball championship finals of the year. Don\'t miss the action!',
    date: addDays(15), // 15 days from now
    venue: 'Madison Square Garden, New York',
    price: 120.00,
    totalSeats: 2000,
    availableSeats: 2000,
    category: 'sports',
  },
  {
    title: 'Art Gallery Exhibition Opening',
    description: 'Experience contemporary art from emerging and established artists. Wine and appetizers will be served.',
    date: addDays(7), // 7 days from now
    venue: 'Metropolitan Museum of Art',
    price: 25.00,
    totalSeats: 200,
    availableSeats: 200,
    category: 'arts',
  },
  {
    title: 'Startup Pitch Competition',
    description: 'Watch innovative startups pitch their ideas to investors. Network with entrepreneurs and investors.',
    date: addDays(60), // 60 days from now
    venue: 'WeWork Hub, San Francisco',
    price: 50.00,
    totalSeats: 300,
    availableSeats: 300,
    category: 'business',
  },
  {
    title: 'Food & Wine Festival',
    description: 'Taste amazing dishes from renowned chefs and sample fine wines from around the world.',
    date: addDays(90), // 90 days from now
    venue: 'Napa Valley Fairgrounds',
    price: 85.00,
    totalSeats: 1000,
    availableSeats: 1000,
    category: 'food',
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Event.deleteMany({});
    console.log('🧹 Cleared existing data');

    // Create admin user first
    const adminUser = await User.create(seedUsers[0]);
    console.log('👑 Created admin user');

    // Create regular users
    const regularUsers = await User.create(seedUsers.slice(1));
    console.log('👥 Created regular users');

    // Create events with admin as creator
    const eventsWithCreator = seedEvents.map(event => ({
      ...event,
      createdBy: adminUser._id.toString(),
    }));

    await Event.create(eventsWithCreator);
    console.log('🎉 Created sample events');

    console.log('\n🌱 Database seeded successfully!');
    console.log('\n📋 Demo Credentials:');
    console.log('Admin: admin@eventbook.com / admin123');
    console.log('User: john@example.com / user123');
    console.log('User: jane@example.com / user123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Disconnected from MongoDB');
    process.exit();
  }
}

seedDatabase();