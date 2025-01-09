  // POST /api/auth/signup
  export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    
    // Create new user logic
    const user = new User({ username, email, password });
    await user.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  };