const pool = require("../config/db");
const bcrypt = require("bcryptjs");

// REGISTER USER
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2. check if user already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // 3. hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. insert user into database
    const newUser = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email`,
      [name, email, hashedPassword]
    );

    // 5. send response (NEVER send password)
    return res.status(201).json({
      message: "User registered successfully",
      user: newUser.rows[0],
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  register,
};