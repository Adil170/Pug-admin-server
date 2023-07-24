// loginController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserScema');
const config = require('../config');

const generateJWTToken = (userId, email) => {
  return jwt.sign({ id: userId, email, type: 'user' }, config.jwtSecret, { expiresIn: '2h' });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).lean();
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // User authentication successful, generate a JWT token
    const token = generateJWTToken(user._id, user.email);

    // Return the token along with the user data in the response
    return res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = loginController;
