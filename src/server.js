import express from "express";
import dotenv from "dotenv";
dotenv.config();
import pkg from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import { dbConn } from "./lib/db.js";
import messageRoute from "./routes/message.route.js";

const PORT = process.env.SERVER_PORT;
const app = express();

app.use(express.json()); // To capture request body data.
const cookieParser = pkg;
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);
app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  dbConn();
});
