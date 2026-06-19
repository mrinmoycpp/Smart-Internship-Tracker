const cors = require("cors");
const express = require("express");
const authRoutes = require("./src/controllers/routes/auth.routes");
const userRoutes = require("./src/controllers/routes/user.routes");
const internshipRoutes = require("./src/controllers/routes/internship.routes");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/internship", internshipRoutes);

app.get("/", (req, res) => {
  res.send("API is working");
});

module.exports = app;