// In controllers/adminController.js

import Admin from '../models/admin.js'; // Import your Admin model

export const getAdminDetails = async (req, res) => {
  try {
    const { email } = req.params;

    // Find the admin by email
    const admin = await Admin.findOne({ email }).select('-password'); // Exclude the password field

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Return the admin details
    res.status(200).json(admin);
  } catch (error) {
    console.error('Error fetching admin details:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};