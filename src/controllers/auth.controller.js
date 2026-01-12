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

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    // If no email or password is present
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // check user is present in db
    const user = await User.findOne({
      email,
    });

    // User is not present in db
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // compare hash password
    const isValidPassword = await bcrypt.compare(password, user.password);

    // password is incorrect
    if (!isValidPassword) {
      return res.status(400).json({ message: "Password is not valid" });
    }

    generateJWT(user._id, res);
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: `Internal Server Error ${error.message}` });
  }
};

export const logoutController = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "User Out" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal Server Error ${error.message}` });
  }
};

export const updateProfile = () => {
  const { profilePic } = req.body;
  console.log(profilePic);
};
