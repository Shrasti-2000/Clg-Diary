const jwt = require('jsonwebtoken')

const adminProtect = async (req, res, next) => {
  const User = require("../model/authModel");
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decode.id).select('-password');
      if (!user) {
       res.status(401).json({ message: 'Unauthorized access: user not found' });
      }
      if (user.isAdmin) {
        req.user = user;
        next()
      } else {
     res.status(401).json({ message: 'Unauthorized access: Admin Only' });
      }
    } catch (error) {
    res.status(401).json({ message: 'Unauthorized access: invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized access: token missing' });
  }
};

module.exports = adminProtect