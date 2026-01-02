import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConn = async () => {
  console.log("Db middleware");

  try {
    const conn = await mongoose.connect(process.env.DB_CONN);

    console.log(`DB Connection Successfull ${conn.connection.host}`);
  } catch (err) {
    console.error("DB connection failed:", err.message);
    res.status(500).json({ error: "Database unavailable" });
  }
};
