import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Card, CardContent } from '@mui/material';
import { CardFooter, CardHeader, CardTitle } from "react-bootstrap";
import { Input } from "@mui/material";
import { adminlogin } from "../api/api.js";
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      // Send login request to the backend
      const response = await adminlogin(email, password);
      // console.log("API response:", response);
      
      // Ensure response.data is defined before accessing token
      if (response && response.token) {
        const token = response.token;
        localStorage.setItem('adminEmail', email);
        localStorage.setItem('adminToken', token); // Store the JWT token in localStorage
        
        console.log('Admin logged in successfully!');

        // Redirect admin to their dashboard
        navigate('/admindashboard');
      } else {
        setError('Login failed, no token provided');
      }
    } catch (err) {
      setError('Invalid email or password');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <Card className="bg-white opacity-85 text-opacity-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">ADMIN LOGIN</CardTitle>
          <p className="text-center">Login to your admin account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email">Email :</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password">Password :</label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" onClick={handleLogin}>Login</Button>
              <div className="text-center space-y-2">
                <Link to="/login" className="text-sm text-primary hover:underline">
                  User Login
                </Link>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}