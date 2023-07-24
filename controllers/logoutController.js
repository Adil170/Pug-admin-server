
const logoutController = (req, res) => {
    try {
      // Clear the token cookie by setting it to an empty value with maxAge 0
      res.cookie('token', '', { maxAge: 0, httpOnly: true });
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({ error: 'Logout failed' });
    }
  };
  
  module.exports = logoutController;
  