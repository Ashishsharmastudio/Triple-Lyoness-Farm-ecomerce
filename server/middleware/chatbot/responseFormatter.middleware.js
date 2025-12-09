const formatResponse = (response) => {
  return {
    format(rawResponse) {
      const formatted = {
        text: rawResponse,
        timestamp: new Date(),
        sections: rawResponse.split("\n").filter(Boolean),
        summary: rawResponse.substring(0, 150) + "...",
      };
      return formatted;
    },

    sanitize(text) {
      return text.replace(/[<>]/g, "").trim();
    },
  };
};

module.exports = { formatResponse };
