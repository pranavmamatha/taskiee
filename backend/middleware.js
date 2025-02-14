const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer")) {
    return res.status(403).json({});
  }
  const token = auth.split(" ")[1];

  try {
    const verify = jwt.verify(token, JWT_SECRET);
    req.userId = verify.userId;
    next();
  } catch (error) {
    return res.status(403).json({});
  }
};

module.exports = { authMiddleware };
