import sql from "mssql";
import bcrypt from "bcryptjs";
export const signupController = async (req, res) => {
  // Access user data
  const { fullName = "", email, password = "" } = req.body;
  try {
    // Check password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be greater than 6" });
    }
    // Check user exist
    const request = new req.db.Request();
    request.input("fullName", sql.VarChar, fullName);
    request.input("email", sql.VarChar, email);
    const queryText = `SELECT * FROM  chatTime.Users WHERE email = @email`;
    const result = await request.query(queryText);
    console.log(result.recordsets[0].length);

    if (result.recordsets[0].length) {
      return res.status(400).json({ message: "User already exists" });
    }
    // hash password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const passwordBuffer = Buffer.from(hashedPassword, "utf8");
    request.input("password", sql.VarBinary, passwordBuffer);
    // 1233kk => eqkjkjI23;
    const insertUserQuery = `INSERT INTO chatTime.Users(fullName,email,password) values(@fullName, @email,@password )`;
    const newUser = await request.query(insertUserQuery);
    console.log(newUser.recordsets);
  } catch (error) {}
  res.send("signup route");
};

export const loginController = (req, res) => {
  res.send("login route");
};

export const logoutController = (req, res) => {
  res.send("logout route");
};
