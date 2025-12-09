const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, maxlength: 1000 },
    price: { type: String, required: true }, // Using String to accommodate units like "$10/kg"
    category: { type: String, required: true, index: true }, // Flexible category string
    status: {
      type: String,
      enum: ["Available", "Sold Out"],
      default: "Available",
      index: true
    },
    imageUrl: { type: String },
    // Keeping strict fields optional or removed to allow flexibility
    solutionSet: { type: String },
    specificCategory: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
