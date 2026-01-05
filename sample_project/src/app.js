const express = require("express");
const userRoutes = require("./routes/user.routes");
// const courseRoutes = require("./routes/course.routes");

const app = express();

app.use(express.json());

app.use("/user", userRoutes);

// app.use("/course", courseRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = app;
