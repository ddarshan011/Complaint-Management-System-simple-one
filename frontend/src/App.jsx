// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import UserDashboard from './Components/UserDashboard'
import Signup from './Components/Signup'
import AdminDashboard from './Components/AdminDashboard'
// import Navbar from './Components/Navbar'
import AdminLogin from './Components/AdminLogin'

function App() {


  return (
    <>
    
    <Router>
      

      
      <Routes>
        {/* <Navbar>  
        </Navbar> */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/adminlogin" element={<AdminLogin />} />

      </Routes>
    
    </Router>
    </>
  )
}



export default App
