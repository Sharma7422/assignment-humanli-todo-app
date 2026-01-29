const User = require("../models/User");
const jwt = require("jsonwebtoken");


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "humanli_secret_key", {
    expiresIn: "7d",
  });
};

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

  
    const user = await User.create({ email, password });

   
    const token = generateToken(user._id);

    res.status(201).json({
      message: "User created successfully",
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

   
    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
