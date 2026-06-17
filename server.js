const dotenv = require("dotenv");
dotenv.config();
const pool = require("./src/config/db"); // adjust path if needed

async function testDB() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("✅ Connected to PostgreSQL!");
    console.log(result.rows[0]);
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
  }
}

testDB();

const app = require("./app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});