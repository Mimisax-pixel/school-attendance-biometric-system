import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ 
      status: "failed", 
      message: "No token provided, authorization denied",
      authenticated: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: "failed",
      message: "Token is not valid",
      authenticated: false,
    });
  }
};

export default isAuthenticated;
