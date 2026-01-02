import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateJWT from "../lib/utils.js";
export const signupController = async (req, res) => {
  // Access user data
  const { name = "", email, password = "" } = req.body;
  try {
    // Check password length
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be greater than 6" });
    }

    // Check user exist in database
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // 1233kk => eqkjkjI23;
    console.log(hashedPassword);

    // Create new password
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    console.log(newUser);

    if (newUser) {
      // generate jwt token
      generateJWT(newUser._id, res);
      await newUser.save();
      return res.status(201).json({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
  res.send("signup route");
};

export const loginController = (req, res) => {
  res.send("login route");
};

export const logoutController = (req, res) => {
  res.send("logout route");
};
