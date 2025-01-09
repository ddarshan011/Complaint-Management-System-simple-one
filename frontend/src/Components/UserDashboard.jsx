import { useState, useEffect } from 'react';
import { submitComplaint, fetchUserComplaints, fetchUserDetails } from '../api/api.js'; 

function UserDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [newComplaint, setNewComplaint] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // To store user details

  // Fetch user complaints and user details when the component mounts
  useEffect(() => {
    const fetchComplaintsAndDetails = async () => {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email'); // Fetch email from localStorage
      // console.log(`Token: ${token}, Email: ${email}`);
      
      if (!token || !email) {
        // Redirect to login or handle unauthorized access
        window.location.href = '/login';
        return;
      }

      try {
        // Fetch user details using email
        const userData = await fetchUserDetails(email, token);
          // Assuming API response contains user details
        // console.log("zxcvb",userData);
        setUser(userData); // Store user details in state

        // Fetch user complaints using email
        const complaintsResponse = await fetchUserComplaints(email, token);
        // console.log("Fetched complaints:", complaintsResponse);
        setComplaints(Array.isArray(complaintsResponse) ? complaintsResponse : []); // Ensure it's an array

      } catch (error) {
        console.error('Error fetching complaints or user details:', error);
        setComplaints([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaintsAndDetails();
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    localStorage.removeItem('email'); // Remove email from local storage
    window.location.href = '/login'; // Redirect to login
  };
  
  // Submit a new complaint
  const handleSubmitComplaint = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email'); // Use email stored in localStorage
    // const name = 
    const userData = await fetchUserDetails(email, token);
          // Assuming API response contains user details
        console.log("zxcvb",userData);
        setUser(userData); 
    if (newComplaint.trim()) {
      try {
        
        const complaintData = { email: email, description: newComplaint }; // Prepare complaint data
        console.log("***",complaintData);
        const response = await submitComplaint(
          
          complaintData.description,
          email,                   // User's email
          token                     // Authorization token
        );

        console.log('Complaint submitted:', response);
        // Add the newly submitted complaint to the state
        setComplaints([...complaints, response]); // response should contain the new complaint
        setNewComplaint(''); // Clear the input field after submission
      } catch (error) {
        console.error('Error submitting complaint:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
  <div className="p-8 items-center flex flex-col max-w-5xl mx-auto bg-gray-50 opacity-85 rounded-lg shadow-lg">
    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 text-center">User Dashboard</h1>
    {user && (
      <div className="mb-4 text-center">
        <h2 className="text-xl font-semibold text-gray-700">Welcome, {user.name}</h2>
        <p className="text-sm text-gray-600 mb-4">Email: {user.email}</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-all"
        >
          Logout
        </button>
      </div>
    )}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Submit a Complaint Card */}
      <div className="p-6 bg-white shadow-lg rounded-md">
        <div className="card-header mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Submit a Complaint</h2>
        </div>
        <div className="card-content">
          <form onSubmit={handleSubmitComplaint} className="flex flex-col">
            <textarea
              placeholder="Describe your complaint"
              value={newComplaint}
              onChange={(e) => setNewComplaint(e.target.value)}
              className="mb-4 w-full p-3 rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 resize-none"
            />
            <button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800 hover:text-gray-200 py-2 rounded-md shadow-md transition-all"
            >
              Submit Complaint
            </button>
          </form>
        </div>
      </div>

      {/* Complaints List Card */}
      <div className="p-6 bg-white shadow-lg rounded-md w-[450px]">
        <div className="card-header mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Your Complaints</h2>
        </div>
        <div className="card-content">
          {loading ? (
            <p>Loading complaints...</p>
          ) : complaints.length === 0 ? (
            <p>No complaints submitted yet.</p>
          ) : (
            <ul className="list-disc pl-5 space-y-3">
              {complaints.map((complaint, index) => (
                <li key={index} className="text-gray-700">
                  {complaint.description} - <span className="text-sm text-gray-600">{complaint.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

export default UserDashboard;
