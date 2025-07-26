// src/controllers/ai.controllers.js
const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  const code = req.body.code;

  if (!code) {
    return res.status(400).send("Code is required");
  }

  try {
    const response = await aiService(code);
    res.send({ response }); // Sending it as JSON
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).send("Failed to generate response");
  }
};
