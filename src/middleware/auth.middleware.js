import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export default function protectedRoute(req, res, next) {
  try {
    // Get token from cookie
    const token = req.cookie.jwt;

    // Token is not present then unauthorised
    if (!token) {
      return res.status(401).json({ message: "Unauthorised access" });
    }

    // verify jwt token is same
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Not same unauthorized
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorised access" });
    }

    // Find user present in db
    const user = User.findOne(ecoded.userId).select("-password");

    // User not present error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal Server Error ${error.message}` });
  }
}
