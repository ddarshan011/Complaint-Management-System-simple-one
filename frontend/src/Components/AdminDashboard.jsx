import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAdminDetails, fetchAllComplaints, updateComplaintStatus } from '../api/api.js';

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminDataAndComplaints = async () => {
      const token = localStorage.getItem('adminToken');
      const email = localStorage.getItem('adminEmail'); // Fetch email from localStorage
      console.log('Retrieved token:', token);
      if (!token || !email) {
        navigate('/adminlogin');
        return;
      }

      try {
        // Fetch admin details
        const adminData = await fetchAdminDetails(email,token);
        setAdmin(adminData);

        // Fetch all complaints
        const complaintsData = await fetchAllComplaints(token);
        console.log("complaint data",complaintsData);
        setComplaints(complaintsData);
      } catch (error) {
        console.error('Error fetching admin data or complaints:', error);
        if (error.response && error.response.status === 401) {
          // Unauthorized, token might be invalid
          localStorage.removeItem('adminToken');
          navigate('/adminlogin');
        }
      } finally {
        setLoading(false);
      }
    };  

    fetchAdminDataAndComplaints();
  }, [navigate]);

  // const handleLogout = () => {
  //   localStorage.removeItem('adminToken');
  //   navigate('/adminlogin');
  // };

  const handleStatusChange = async (email, newStatus) => {
    //const token = localStorage.getItem('adminToken');
    // debugger;
    console.log('newstatus',newStatus);
    try {
      // console.log("asd");
      await updateComplaintStatus(email, newStatus);
      // console.log("updated success");
      setComplaints((prevComplaints) => {
        console.log('Updating previous complaints...');
        const updatedComplaints = prevComplaints.map((complaint) =>
          complaint.email === email ? { ...complaint, status: newStatus } : complaint
        );
        console.log('Previous complaints updated successfully!');
        return updatedComplaints;
      });
  
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 max-w-4xl w-full opacity-85  bg-white rounded-lg shadow-lg">
        {admin ? (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center text-opacity-100">Admin Dashboard</h1>
            <div className="mb-6 text-center">
              <p className="text-xl">Welcome, {admin.username}</p>
              <button
                onClick={() => {
                  localStorage.removeItem('adminToken');
                  navigate('/adminlogin');
                }}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
            <h4>totalnumber of complaints: {complaints.count}</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">User Email</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.complaints.map((complaint) => (
                    <tr key={complaint._id} className="border-b border-gray-200">
                      <td className="px-4 py-2">{complaint.username || 'Unknown'}</td>
                      <td className="px-4 py-2">{complaint.description}</td>
                      <td className="px-4 py-2">{complaint.email}</td>
                      <td className="px-4 py-2">{complaint.status}</td>
                      <td className="px-4 py-2">
                        <div>

                        <select
                          defaultValue={complaint.status}
                          onChange={(e) => {
                            
                            handleStatusChange(complaint.email, e.target.value);}}
                            className="bg-white border border-gray-300 rounded-md py-2 px-4"
                            >
                          <option value="open" >Open</option>
                          <option value="closed" >Closed</option>
                        </select>
                          </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="text-center">You are not authorized to access this dashboard.</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;