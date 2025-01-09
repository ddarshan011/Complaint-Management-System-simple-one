import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from'dotenv';
import User from "../models/user.js";
// import mongoose from "mongoose";/

dotenv.config();

// import moment from "moment";
const secret = process.env.SECRET;

export const signin = async (req, res) => {
 
  const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
    const isPswCorrect = await bcrypt.compare(password, oldUser.password);
   
    if (!isPswCorrect) return res.status(400).json({ message: "Invalid Password" });
    
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "2h" });
    
    res.status(200).json({ result: oldUser, token });
  } catch (err) {
   
    res.status(500).json({ message: "Something went wrong!" });
  }
};



export const createUser = async (req, res) => {

  const { email, password, status, name } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) return res.status(400).json({ message: "User already available" });
    
    const hashedPsw = await bcrypt.hash(password, 12);
    const result = await User.create({ email:email, password: hashedPsw, name: name,status:status });
    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "2h" } );
    
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// Controller function to get user details by userId
export const getUserDetails = async (req, res) => {
  try {
    const userId = req.params.userId; // Get userId from the request params
    const user = await User.findById(userId).select('name email'); // Find user by ID and select required fields

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user); // Return the user details
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching user details' });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params; // Get email from request parameters

    // Find the user in the database using the email
    const user = await User.findOne({ email });

    // If the user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the found user details
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by email:', error);
    res.status(500).json({ error: error.message }); // Handle any server errors
  }
};