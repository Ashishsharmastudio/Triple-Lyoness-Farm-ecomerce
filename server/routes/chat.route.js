const express = require("express");
const router = express.Router();
const chatController = require("../src/chatbot/chatController");

router.post("/ask", (req, res) => chatController.handleQuestion(req, res));
router.post("/service/:serviceId/ask", (req, res) => {
  const { serviceId } = req.params;
  const { question } = req.body;
  chatController.handleServiceSpecificQuestion(serviceId, question, req, res);
});
router.get("/history/:userId", (req, res) =>
  chatController.getChatHistory(req, res)
);

module.exports = router;
