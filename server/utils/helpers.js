const moment = require("moment");

// Date and Time Helpers
exports.isValidFutureDate = (date) => {
  const now = moment();
  return moment(date).isValid() && moment(date).isAfter(now);
};

exports.formatDateToISO = (date) => {
  return moment(date).toISOString();
};

exports.getTimeSlots = (startTime, endTime, duration) => {
  const slots = [];
  let currentTime = moment(startTime);
  const end = moment(endTime);

  while (currentTime.isBefore(end)) {
    slots.push(currentTime.format("HH:mm"));
    currentTime.add(duration, "minutes");
  }
  return slots;
};

// String Helpers
exports.sanitizeString = (str) => {
  return str.trim().replace(/[^\w\s-]/g, "");
};

exports.generateBookingReference = () => {
  return `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// File Helpers
exports.getFileExtension = (filename) => {
  return filename.split(".").pop().toLowerCase();
};

exports.isValidFileType = (fileType) => {
  const validTypes = ["image/jpeg", "image/png", "application/pdf"];
  return validTypes.includes(fileType);
};

// Validation Helpers
exports.isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

exports.isValidPhone = (phone) => {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
};

// Business Logic Helpers
exports.calculateTotalDuration = (services) => {
  return services.reduce((total, service) => total + service.duration, 0);
};

exports.calculateTotalPrice = (services) => {
  return services.reduce((total, service) => total + service.price, 0);
};

// Response Formatters
exports.formatSuccessResponse = (data) => {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };
};

exports.formatErrorResponse = (message, code) => {
  return {
    success: false,
    error: {
      message,
      code,
    },
    timestamp: new Date().toISOString(),
  };
};

// Pagination Helper
exports.getPaginationData = (page, limit, total) => {
  return {
    currentPage: parseInt(page),
    totalPages: Math.ceil(total / limit),
    totalItems: total,
    itemsPerPage: parseInt(limit),
  };
};

// Time Zone Helper
exports.convertToUserTimezone = (date, timezone) => {
  return moment(date).tz(timezone).format();
};

// Array Helpers
exports.chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};
