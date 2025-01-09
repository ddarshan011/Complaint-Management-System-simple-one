import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, Input,Card, CardContent} from '@mui/material';
import { CardFooter, CardHeader } from "react-bootstrap";

import { signup } from '../api/api.js';
export default function Signup() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // For handling signup errors
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error messages

    try {
      // Send signup data to backend
      const userData = await signup( username, email, password );
      console.log("Signup",userData);
      
      // If signup is successful, navigate to login page or auto-login
      console.log('User registered successfully', userData.data);
      navigate('/login'); // Redirect to login page after successful signup
    } catch (err) {
      setError('Failed to register. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader title='Sign Up' />

        <CardContent>
          <form onSubmit={handleSignup}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="name">Name</label>
                <Input 
                  id="name" 
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="email">Email</label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="password">Password</label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>} {/* Show error message if signup fails */}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit" onClick={handleSignup}>Sign Up</Button>
          <Link to="/login" className="text-primary hover:underline">
                    Back to Login
                  </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
