const express = require("express");
const router = express.Router();
const aiController = require("../controllers/ai.controllers");

router.post("/get-review", aiController.getReview);

module.exports = router;
