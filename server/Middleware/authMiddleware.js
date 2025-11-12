const jwt = require("jsonwebtoken");
const User = require("../model/authModel");


const protect = async (req, res, next) => {
  
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]
      let decode = jwt.verify(token, process.env.JWT_SECRET)
      let user = await User.findById(decode.id).select("-password")

      if (!user) {
        res.status(401);
        throw new Error("unauthorized access ")
      }
      req.user = user

      next()

    } catch (error) {
  res.status(401)
  throw new Error('Unauthorized access')

  }
  } else {
    res.status(401)
    throw new Error('unauthorized access')
  }
}

module.exports = protect;
