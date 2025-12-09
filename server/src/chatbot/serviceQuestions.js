const predefinedQuestions = {
  categories: [
    "Tell me about your health and safety services",
    "What smart home solutions do you offer?",
    "How do your security systems work?",
    "What are your service prices?",
    "Do you offer installation services?",
  ],

  generateSuggestions(category) {
    const suggestions = {
      Health: ["emergency response", "fall detection", "medical alerts"],
      Security: ["cameras", "smart locks", "monitoring"],
      SmartHome: ["automation", "energy management", "lighting"],
    };
    return suggestions[category] || [];
  },
};

module.exports = predefinedQuestions;
