const GeminiClient = require("./geminiClient");
const Chat = require("../../models/Chat.model");
const Service = require("../../models/Service");

class ChatController {
  async handleQuestion(req, res) {
    try {
      console.log("Request received:", req.body);
      const { question } = req.body;
      console.log("Question:", question);

      // Get all available services/products
      console.log("Fetching available services...");
      const services = await Service.find({
        isAvailable: true,
      });
      console.log(`Found ${services.length} services`);

      console.log("Detecting relevant service...");
      const relevantService = await this.detectRelevantService(
        question,
        services
      );
      console.log("Relevant service detected:", relevantService?.name);

      console.log("Generating response with GeminiClient...");
      const response = await GeminiClient.generateResponse(
        services,
        question
      );
      console.log("Generated response:", response);

      return res.status(200).json({
        success: true,
        data: {
          answer: response,
          detectedService: relevantService?.name || "General Inquiry",
          category: relevantService?.category || "General",
        },
      });
    } catch (error) {
      console.error("Error in handleQuestion:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  async detectRelevantService(question, services) {
    const lowerQuestion = question.toLowerCase();

    // Simple keyword matching for farm products
    const keywordMap = {
      beef: services.filter(s => s.name.toLowerCase().includes('beef') || s.description.toLowerCase().includes('beef')),
      pork: services.filter(s => s.name.toLowerCase().includes('pork') || s.description.toLowerCase().includes('pork')),
      chicken: services.filter(s => s.name.toLowerCase().includes('chicken') || s.description.toLowerCase().includes('chicken')),
      egg: services.filter(s => s.name.toLowerCase().includes('egg') || s.description.toLowerCase().includes('egg')),
      turkey: services.filter(s => s.name.toLowerCase().includes('turkey') || s.description.toLowerCase().includes('turkey')),
    };

    for (const [keyword, matchedServices] of Object.entries(keywordMap)) {
      if (lowerQuestion.includes(keyword) && matchedServices.length > 0) {
        return matchedServices[0];
      }
    }

    return services[0];
  }
}

module.exports = new ChatController();
