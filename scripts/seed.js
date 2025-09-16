// scripts/seed.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// MongoDB URI
const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb://localhost:27017/event-booking-system';

// User Schema (simplified for seeding)
const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Event Schema (simplified for seeding)
const EventSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

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
const addDays = (days) =>
  new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

const seedEvents = [
  {
    title: 'Summer Music Festival 2025',
    description:
      'Join us for an amazing summer music festival featuring top artists from around the world. Experience live performances, great food, and unforgettable memories.',
    date: addDays(30), // 30 days from now
    venue: 'Central Park, New York',
    price: 75.0,
    totalSeats: 5000,
    availableSeats: 5000,
    category: 'music',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&h=300&fit=crop',
  },
  {
    title: 'Tech Innovation Conference',
    description:
      'Discover the latest in technology innovation with industry leaders sharing insights on AI, blockchain, and future trends.',
    date: addDays(45), // 45 days from now
    venue: 'Silicon Valley Convention Center',
    price: 150.0,
    totalSeats: 500,
    availableSeats: 500,
    category: 'technology',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop',
  },
  {
    title: 'Basketball Championship Finals',
    description:
      "Watch the most exciting basketball championship finals of the year. Don't miss the action!",
    date: addDays(15), // 15 days from now
    venue: 'Madison Square Garden, New York',
    price: 120.0,
    totalSeats: 2000,
    availableSeats: 2000,
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&h=300&fit=crop',
  },
  {
    title: 'Art Gallery Exhibition Opening',
    description:
      'Experience contemporary art from emerging and established artists. Wine and appetizers will be served.',
    date: addDays(7), // 7 days from now
    venue: 'Metropolitan Museum of Art',
    price: 25.0,
    totalSeats: 200,
    availableSeats: 200,
    category: 'arts',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop',
  },
  {
    title: 'Startup Pitch Competition',
    description:
      'Watch innovative startups pitch their ideas to investors. Network with entrepreneurs and investors.',
    date: addDays(60), // 60 days from now
    venue: 'WeWork Hub, San Francisco',
    price: 50.0,
    totalSeats: 300,
    availableSeats: 300,
    category: 'business',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&h=300&fit=crop',
  },
  {
    title: 'Food & Wine Festival',
    description:
      'Taste amazing dishes from renowned chefs and sample fine wines from around the world.',
    date: addDays(90), // 90 days from now
    venue: 'Napa Valley Fairgrounds',
    price: 85.0,
    totalSeats: 1000,
    availableSeats: 1000,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=300&fit=crop',
  },
  {
    title: 'Rock Concert: Electric Nights',
    description:
      'Experience an electrifying night of rock music with popular bands and emerging artists. Get ready for an unforgettable musical journey.',
    date: addDays(20),
    venue: 'Red Rocks Amphitheatre, Colorado',
    price: 95.0,
    totalSeats: 3000,
    availableSeats: 3000,
    category: 'music',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop&auto=format',
  },
  {
    title: 'International Tennis Championship',
    description:
      'Watch world-class tennis players compete in this prestigious championship. Witness incredible athleticism and competitive spirit.',
    date: addDays(35),
    venue: 'Arthur Ashe Stadium, New York',
    price: 180.0,
    totalSeats: 1500,
    availableSeats: 1500,
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&auto=format',
  },
  {
    title: 'Digital Marketing Summit 2025',
    description:
      'Learn cutting-edge digital marketing strategies from industry experts. Perfect for marketers, entrepreneurs, and business owners.',
    date: addDays(50),
    venue: 'Los Angeles Convention Center',
    price: 125.0,
    totalSeats: 800,
    availableSeats: 800,
    category: 'business',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&auto=format',
  },
  {
    title: 'Contemporary Dance Showcase',
    description:
      'A mesmerizing display of contemporary dance featuring local and international dance companies. Experience art in motion.',
    date: addDays(25),
    venue: 'Lincoln Center, New York',
    price: 45.0,
    totalSeats: 400,
    availableSeats: 400,
    category: 'arts',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop&auto=format',
  },
  {
    title: 'AI & Machine Learning Conference',
    description:
      'Explore the future of artificial intelligence and machine learning. Network with researchers, developers, and industry leaders.',
    date: addDays(65),
    venue: 'MIT Media Lab, Boston',
    price: 200.0,
    totalSeats: 350,
    availableSeats: 350,
    category: 'technology',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&auto=format',
  },
  {
    title: 'Yoga & Wellness Retreat',
    description:
      'Rejuvenate your mind, body, and soul in this comprehensive wellness retreat featuring yoga, meditation, and holistic healing.',
    date: addDays(40),
    venue: 'Sedona Retreat Center, Arizona',
    price: 120.0,
    totalSeats: 150,
    availableSeats: 150,
    category: 'health',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format',
  },
  {
    title: 'Craft Beer Festival',
    description:
      'Sample unique craft beers from over 50 local breweries. Enjoy live music, food trucks, and beer-making demonstrations.',
    date: addDays(55),
    venue: 'Denver Beer Gardens, Colorado',
    price: 60.0,
    totalSeats: 2500,
    availableSeats: 2500,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=800&h=600&fit=crop&auto=format',
  },
  {
    title: 'Photography Workshop: Street Photography',
    description:
      'Master the art of street photography with professional photographers. Learn composition, lighting, and storytelling techniques.',
    date: addDays(30),
    venue: 'Photography Studio, Chicago',
    price: 75.0,
    totalSeats: 25,
    availableSeats: 25,
    category: 'education',
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop&auto=format',
  },
  {
    title: 'Marathon Training Bootcamp',
    description:
      'Intensive training program for marathon runners. Professional coaching, nutrition guidance, and group support included.',
    date: addDays(10),
    venue: 'Central Park Running Track, New York',
    price: 35.0,
    totalSeats: 100,
    availableSeats: 100,
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&h=600&fit=crop&auto=format',
  },
  {
    title: 'Jazz Evening Under the Stars',
    description:
      'Smooth jazz performances by renowned musicians in an intimate outdoor setting. Bring your loved ones for a magical evening.',
    date: addDays(75),
    venue: 'Hollywood Bowl, Los Angeles',
    price: 65.0,
    totalSeats: 800,
    availableSeats: 800,
    category: 'music',
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=600&fit=crop&auto=format',
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
    await User.create(seedUsers.slice(1));
    console.log('👥 Created regular users');

    // Create events with admin as creator
    const eventsWithCreator = seedEvents.map((event) => ({
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
