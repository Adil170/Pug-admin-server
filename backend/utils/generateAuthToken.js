const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config()

const generateAuthToken = (user) => {
  const jwtSecretKey = process.env.JWT_SECRET;
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    jwtSecretKey
  );

  return token;
};

module.exports = generateAuthToken;
