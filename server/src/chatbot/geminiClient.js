const { model } = require("../../config/gemini");
const Service = require("../../models/Service");

class GeminiClient {
  async generateResponse(services, question) {
    const serviceDetails = services.map((s) => ({
      name: s.name,
      description: s.description,
      category: s.category,
      price: s.price,
    }));

    const prompt = `
      You are a friendly and knowledgeable farm assistant for Triple Lyoness Farm. 
      We are a family-run farm in rural Canada (Andria, Jessica, Briana, Rod, and Janet Carlyon).
      We produce pasture-raised beef, chicken, turkey, and free-range pork and eggs.
      
      Available Products/Services: ${JSON.stringify(serviceDetails)}
      User Question: ${question}
      
      Guidelines:
      - Be warm, welcoming, and helpful.
      - Focus on the quality, freshness, and ethical raising of our animals.
      - If asked about specific products, use the provided list.
      - If asked about something we don't have, politely explain what we do offer.
      - Keep responses concise (under 3-4 sentences) unless detailed info is requested.
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  }

  async getServiceSpecificResponse(serviceId, question) {
    try {
      const service = await Service.findById(serviceId);
      const prompt = `
        Service Details: ${JSON.stringify(service)}
        Question: ${question}
        
        Please provide detailed information about this specific service.
      `;

      const result = await model.generateContent(prompt);
      return result.response.text();
      console.log(result.response.text());
    } catch (error) {
      throw new Error(`Failed to generate response: ${error.message}`);
    }
  }
}

module.exports = new GeminiClient();
