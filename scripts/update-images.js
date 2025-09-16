// scripts/update-images.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/event-booking-system';

// Event Schema (simplified for updating)
const EventSchema = new mongoose.Schema({
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
}, { timestamps: true });

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

// Image mappings based on categories
const categoryImages = {
  'music': 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop&auto=format',
  'technology': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&auto=format',
  'sports': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop&auto=format',
  'arts': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format',
  'business': 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop&auto=format',
  'food': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format'
};

async function updateEventImages() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find all events without images or with empty images
    const events = await Event.find({
      $or: [
        { image: { $exists: false } },
        { image: null },
        { image: '' }
      ]
    });

    console.log(`📷 Found ${events.length} events without images`);

    // Update each event with appropriate image based on category
    let updateCount = 0;
    for (const event of events) {
      const imageUrl = categoryImages[event.category] || categoryImages['business'];

      await Event.findByIdAndUpdate(event._id, {
        image: imageUrl
      });

      updateCount++;
      console.log(`🖼️  Updated "${event.title}" with ${event.category} image`);
    }

    console.log(`\n🎉 Successfully updated ${updateCount} events with images!`);

  } catch (error) {
    console.error('❌ Error updating event images:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Disconnected from MongoDB');
    process.exit();
  }
}

updateEventImages();