import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { dbConn } from "./lib/db.js";
dotenv.config();

const PORT = process.env.SERVER_PORT;
const app = express();

app.use(express.json()); // To capture request body data.
app.use(dbConn);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
