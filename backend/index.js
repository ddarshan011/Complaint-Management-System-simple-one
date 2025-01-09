import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';
// import fs from 'fs';
import router from './routes/routes.js'; // Ensure .js extension is included
import Admin from './models/admin.js'; // Your Admin model
import adminData from './seeds/admin.json' assert { type: 'json' };

dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 4000;
const URI = process.env.MONGODB_URI;

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Allow your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true, // Allow credentials (if needed)
}));

// Use routes
app.use(router);

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure
  }
};

// Seed Admin Data from JSON file
const seedAdminData = async () => {
  try {
    // Read the JSON file
    // const adminData = JSON.parse(fs.readFileSync('./seeds/admin.json', 'utf-8'));

    for (const admin of adminData) {
      const { username, email, password } = admin;

      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ email });

      if (!existingAdmin) {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new Admin
        const newAdmin = new Admin({
          username,
          email,
          password: hashedPassword
        });

        // Save the new Admin to the database
        await newAdmin.save();
        console.log(`Admin user ${username} seeded successfully.`);
      } else {
        console.log(`Admin with email ${email} already exists.`);
      }
    }
  } catch (error) {
    console.error('Error seeding admin data:', error);
  }
};

// Start the server and connect to the database
const startServer = async () => {
  await connectDB(); // Connect to the database first
  await seedAdminData(); // Seed admin user from JSON file
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

// Start the server
startServer();
