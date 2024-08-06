
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).send('You need to login first');
    }
  
    jwt.verify(token, 'tokenKey', async (error, decoded) => {
      if (error) {
        return res.status(401).send('Your token has expired. Please login again.');
      }
  
      try {
        const user = await User.findOne({ email: decoded.email });
        if (!user) {
          return res.status(401).send('User not found');
        }
        req.user = { isAdmin: user.isAdmin, id: user._id };
        next();
      } catch (error) {
        next(error);
      }
    });
};
