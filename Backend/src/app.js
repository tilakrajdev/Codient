// src/app.js
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config(); // ✅ Load environment variables
const cors = require("cors");

const aiRoutes = require("./routes/ai.routes");

app.use(express.json()); // ✅ To parse JSON request bodies
app.use(cors()); // ✅ Enable CORS

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/ai", aiRoutes); // ✅ Corrected prefix from 'ai' to '/ai'

module.exports = app;
