import express from 'express';
import { signup, login, adminlogin } from '../controllers/authController.js'; // Update extensions to .js for ES modules
import { createComplaint, getAllComplaints, updateComplaintStatus, getUserComplaints,getUserComplaintsByEmail } from '../controllers/complaint.js'; // Update extensions to .js
import { protect } from '../middlewares/authMiddleware.js'; // Ensure you import with .js extension
import { getUserDetails, getUserByEmail } from '../controllers/user.js'; // Update extensions to .js
import { getAdminDetails } from '../controllers/admin.js'; 

const router = express.Router();

// Auth routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/adminlogin', adminlogin);
router.get('/admin/details/:email',  getAdminDetails);
// Complaint routes (protected route)
router.post('/complaint', protect, createComplaint);

// Protected route for fetching user-specific complaints
router.get('/complaint/user', protect, getUserComplaints);
router.get('/user', protect, getUserDetails);
router.get('/user/email/:email', protect, getUserByEmail);
router.get('/complaints/user/:email', protect, getUserComplaintsByEmail); // Protect this route with authentication middleware
// Admin routes (requires admin role)
router.get('/complaints/user/',  getAllComplaints);
router.put('/admin/complaint/:email', updateComplaintStatus);

export default router;
