import Complaint from '../models/complaint.js';  // ES Module import
import User from '../models/user.js'

export const createComplaint = async (req, res) => {
  const { description,email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const newComplaint = new Complaint({
      
      description,
      email: email, // Attach user ID from decoded JWT
    });
    await newComplaint.save();
    res.status(201).json(newComplaint);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getUserComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ email: req.user.email }); // Find complaints by user ID
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateComplaintStatus = async (email, newStatus) => {
  // const { email } = req.params;
  // const { newstatus } = req.body;

  try {
    console.log("111111111111111111111111111111111");
    const complaint = await Complaint.findOneAndUpdate({email: email}, { status: newStatus }, { new: true });
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    console.log(complaint);
    
    return complaint;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// In controllers/complaint.js

export const getAllComplaints = async (req, res) => {
  try {
    // console.log('Fetching all complaints...');
    const complaints = await Complaint.find().lean().sort({ createdAt: -1 });
    console.log(`Found ${complaints.length} complaints`);

    if (complaints.length === 0) {
      return res.status(200).json({ message: 'No complaints found', complaints: [] });
    }

    // Fetch all unique user emails from complaints
    const userEmails = [...new Set(complaints.map(c => c.email))];
    
    // Fetch user details for these emails
    const users = await User.find({ email: { $in: userEmails } }).lean();
    
    // Create a map of email to username
    const emailToNameMap = users.reduce((map, user) => {
      map[user.email] = user.name;
      return map;
    }, {});

    const processedComplaints = complaints.map(complaint => ({
      ...complaint,
      username: emailToNameMap[complaint.email] || 'Unknown',
    }));

    // console.log('Processed complaints:', processedComplaints);

    res.status(200).json({
      message: 'Complaints retrieved successfully',
      count: processedComplaints.length,
      complaints: processedComplaints
    });
  } catch (error) {
    console.error('Error in getAllComplaints:', error);
    res.status(500).json({ 
      message: 'An error occurred while retrieving complaints',
      error: error.message 
    });
  }
};

// Get user complaints by email
export const getUserComplaintsByEmail = async (req, res) => {
  try {
    const { email } = req.params; // Get email from request parameters

    // Find the user by email
    const user = await User.findOne({ email });

    // If the user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch complaints associated with the user ID
    const complaints = await Complaint.find({ email: user.email });

    // Return the user's complaints
    res.status(200).json(complaints);
  } catch (error) {
    console.error('Error fetching complaints by user email:', error);
    res.status(500).json({ error: error.message }); // Handle any server errors
  }
};