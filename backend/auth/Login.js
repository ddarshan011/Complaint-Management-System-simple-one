// POST /api/auth/login
export const login = async (req, res) => {
    const { email, password } = req.body;
  
    // Find user by email
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  
    // Generate JWT token
    const token = user.generateAuthToken();
    res.json({ token });
  };
  


