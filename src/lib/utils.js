import jwt from "jsonwebtoken";
const generateJWT = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("jwt", token, {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent javascript from accessing cookie in browser.
    sameSite: "strict", // Prevent CSRF so request can only come from same site.
    secure: process.env.NODE_ENV !== "development", // false => http, true => https
  });
  return token;
};

export default generateJWT;
