import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();
// Database config (Tedious - works everywhere)
const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: "localhost\\SQLEXPRESS",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  pool: { max: 10, min: 0, idleTimeoutMillis: 30000 },
};
// Global DB connection
export let db = null;

export const dbConn = async (req, res, next) => {
  console.log("Db middleware");

  try {
    if (!db) {
      console.log("Connecting to database...");
      await sql.connect(sqlConfig);
      db = sql;
      console.log("✅ Database connected");
    }
    req.db = db; // Attach to request
    next();
  } catch (err) {
    console.error("DB connection failed:", err.message);
    res.status(500).json({ error: "Database unavailable" });
  }
};
