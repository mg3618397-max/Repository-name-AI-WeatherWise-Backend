const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');
const Location = require('./models/Location');

dotenv.config();

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is missing in your .env file!');
    }

    console.log('[Seed] Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB Atlas successfully.');

    // Clear existing collections
    await User.deleteMany({});
    await Location.deleteMany({});
    console.log('[Seed] Existing collections cleared.');

    // Create Admin User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('1234567', salt);

    const adminUser = await User.create({
      name: 'Weather Admin',
      email: 'weatheradmin@gmail.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log(`[Seed] Created Admin User: ${adminUser.email}`);

    // Create Sample Locations
    await Location.insertMany([
      { user: adminUser._id, city: 'London', country: 'UK' },
      { user: adminUser._id, city: 'Tokyo', country: 'Japan' }
    ]);

    console.log('[Seed] Sample favorite locations created.');
    console.log('\n==========================================');
    console.log('Database Seed Successful!');
    console.log('Email: weatheradmin@gmail.com');
    console.log('Password: 1234567');
    console.log('==========================================\n');

    process.exit(0);
  } catch (error) {
    console.error(`[Seed Error]: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();