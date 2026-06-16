const express = require("express");
const authRoutes = require("./src/controllers/routes/auth.routes");
const userRoutes = require("./src/controllers/routes/user.routes");

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is working");
});

module.exports = app;