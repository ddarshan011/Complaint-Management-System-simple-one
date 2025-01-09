import mongoose from 'mongoose';
// import {User} from './user.js';

const complaintSchema = new mongoose.Schema({
  // name: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true }, // Change this to String instead of ObjectId
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Complaint = mongoose.model('Complaint', complaintSchema);
export default Complaint;