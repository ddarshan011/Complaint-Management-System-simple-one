import axios from "axios";



const API_URL = 'http://localhost:3000'; // Replace with your actual API base URL

// Function to handle user login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Assuming the response contains user data and token
  } catch (error) {
    throw error.response.data; // Propagate the error message
  }
};

export const adminlogin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/adminlogin`, { email, password });
    console.log("qwersdf",response);
    return response.data; // Assuming the response contains user data and token
  } catch (error) {
    throw error.response.data; // Propagate the error message
  }
};

// Function to handle user signup
export const signup = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { username, email, password });
    console.log("api",response);
    return response.data; // Assuming the response contains user data
  } catch (error) {
    console.error('Error during Signup:',error);
    throw error; // Propagate the error message
  }
};
// {hedaders:{'Content-Type':'application/json'}}
// Function to fetch user details (e.g., after login)
export const fetchUserDetails = async (email, token) => {
  try {
    const response = await axios.get(`${API_URL}/user/email/${email}`, {
      headers: {
        Authorization: `Bearer ${token}` // Send the token for authorization
      }
    });
    return response.data; // Return user details
  } catch (error) {
    throw error.response.data; // Propagate the error message
  }
};


// Function to fetch complaints for a specific user
export const fetchUserComplaints = async (email, token) => {
  try {
    const complaintsResponse = await axios.get(`${API_URL}/complaints/user/${email}`, {
      headers: {
        Authorization: `Bearer ${token}` // Send the token for authorization
      }
    });
    // console.log("Fetched complaints:", complaintsResponse);
    return complaintsResponse.data; // Return user complaints
  } catch (error) {
    console.log("qwwwe",error);
    throw error.response.data; // Propagate the error message
  }
};


// Function to submit a new complaint
export const submitComplaint = async (  description, email, token) => {
  try {
    console.log("65465",token);
    const response = await axios.post(`${API_URL}/complaint`, {
      
      description,
      email
    }, {
      headers: {
        Authorization: `Bearer ${token}` // Send the token for authorization
      }
    });
    return response.data; // Return the newly created complaint
  } catch (error) {
    throw error.response.data; // Propagate the error message
  }
};




// Function to fetch all complaints (for admin)
export const fetchAllComplaints = async (token) => {
  try {
    console.log('Fetching all complaints with token:', token);
    const response = await axios.get(`${API_URL}/complaints/user/`, {
      headers: {
        Authorization: `Bearer ${token}` // Send the token for authorization
      }
    });
    console.log("qweasdzxc",response.data.complaints);
    return response.data; // Return all complaints
  } catch (error) {
    throw error.response.data; // Propagate the error message
  }
};

// Function to update the status of a complaint
export const updateComplaintStatus = async (email, newstatus) => {
  try {
    console.log("as");
    const response = await axios.put(`${API_URL}/admin/complaint/${email}`, { newstatus });
    console.log("response data",response);
    return response.data; // Return updated complaint
  } catch (error) {
    throw error.response.data; // Propagate the error message
  }
};


// In api.js

// In api/api.js

export const fetchAdminDetails = async (email, token) => {
  try {
    const response = await axios.get(`${API_URL}/admin/details/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching admin details:', error);
    throw error.response ? error.response.data : error;
  }
};



// const API = axios.create({ baseURL: "http://localhost:3000" });
// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("profile")) {
//     req.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("profile")).token
//     }`;
//   }
//   return req;
// });

// export const signIn = (formData) => API.post("/api/authSignup", formData);

// export const createComplaint = (cp) => API.post("/complaints", cp);

// export const createUser = (users) => API.post("/user", users);

// export const fetchComplaint = () => API.get("/complaints");

// export const updateComplaint = (id, updatedCt) =>
//   API.patch(`/complaints/${id}`, updatedCt);

// export const deleteComplaint = (_id) => API.post(`/complaints/delete/${_id}`);

// export const getComplaint = async (_id) => {
//   _id = _id || "";
//   return await API.get(`/complaints/${_id}`);
// };


// POST /api/auth/login
// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   // Find user by email
//   const user = await User.findOne({ email });
//   if (!user || !(await user.comparePassword(password))) {
//     return res.status(401).json({ message: 'Invalid email or password' });
//   }

//   // Generate JWT token
//   const token = user.generateAuthToken();
//   res.json({ token });
// };


