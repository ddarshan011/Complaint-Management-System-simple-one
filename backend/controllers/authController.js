// const bcrypt = require('bcryptjs');
import bcrypt from 'bcryptjs';
// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Admin from '../models/admin.js';
import dotenv from 'dotenv'
dotenv.config();
const SECRET = process.env.SECRET;

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  
  console.log('Request Body:', req.body); // Add this to debug

  try {
    // Ensure email is a string
    if (typeof email !== 'string') {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("check1");
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    console.log("check11");

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({
      name:username,          // Name of the user
      email,             // Email must be passed correctly as a string
      password: hashedPassword // Store the hashed password
    });
    console.log("newuser",newUser);
    // Save the user to the database
    await newUser.save();

    // Optionally generate a JWT token for the user upon signup
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      'your_jwt_secret_key', // Use an environment variable in production
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'User registered successfully', token });

  } catch (error) {
    console.error('Error is ', error);
    res.status(500).json({ error: error.message });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  // console.log('Request Body:', req.body);
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid name' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ email: user.email }, SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const adminlogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: user.email }, 'your_jwt_secret_key', { expiresIn: '1h' });
    console.log('Generated token:', token);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

