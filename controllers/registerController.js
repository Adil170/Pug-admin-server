// registerController.js
const User = require('../models/UserScema');

const registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username or email already exists in the database
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ error: 'Username or email already exists' });
    }

    // Create a new user instance using the User model
    const newUser = new User({
      username,
      email,
      password,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Registration successful, return a success response
    return res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (err) {
    // Handle any errors that occur during user registration
    console.error('Error registering user:', err);
    return res.status(500).json({ error: 'Error registering user' });
  }
};

module.exports = registerController;
