const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    statistics: {
      totalAppointments: { type: Number, default: 0 },
      totalServices: { type: Number, default: 0 },
      totalRevenue: { type: Number, default: 0 },
      activeServices: { type: Number, default: 0 },
      categoryBreakdown: {
        type: Map,
        of: Number, // Stores count of services per category
      },
      solutionSetBreakdown: {
        type: Map,
        of: Number, // Stores count of services per solution set
      },
    },
    recentActivities: [
      {
        action: {
          type: String,
          enum: [
            "service_created",
            "service_updated",
            "service_deleted",
            "appointment_booked",
          ],
          required: true,
        },
        description: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    settings: {
      notificationsEnabled: { type: Boolean, default: true },
      displayCurrency: { type: String, default: "USD" },
      businessHours: {
        start: String,
        end: String,
      },
    },
  },
  { timestamps: true }
);

// Index for quick lookups
dashboardSchema.index({ owner: 1 });

// Method to update statistics
dashboardSchema.methods.updateStats = async function (updates) {
  Object.assign(this.statistics, updates);
  await this.save();
};

// Method to add activity
dashboardSchema.methods.addActivity = async function (action, description) {
  this.recentActivities.unshift({ action, description });
  if (this.recentActivities.length > 50) {
    this.recentActivities = this.recentActivities.slice(0, 50);
  }
  await this.save();
};

module.exports = mongoose.model("Dashboard", dashboardSchema);
