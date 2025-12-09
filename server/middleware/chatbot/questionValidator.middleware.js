const validateQuestion = async (question) => {
  if (!question || question.trim().length < 3) {
    throw new Error("Question must be at least 3 characters long");
  }

  // Remove any potential harmful characters
  const sanitizedQuestion = question.trim().replace(/[<>]/g, "");

  // Convert common variations to standard forms
  const standardizedQuestion = sanitizedQuestion
    .replace(/howto|how-to/gi, "how to")
    .replace(/\s+/g, " ");

  return standardizedQuestion;
};

module.exports = { validateQuestion };
