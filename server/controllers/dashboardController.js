const Service = require("../models/Service");
const Dashboard = require("../models/Dashboard");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalServices = await Service.countDocuments();
    const activeServices = await Service.countDocuments({ isAvailable: true });

    // Fetch category breakdown
    const categoryStats = await Service.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
    const categoryBreakdown = {};
    categoryStats.forEach((c) => {
      categoryBreakdown[c._id] = c.count;
    });

    // Fetch solution set breakdown
    const solutionSetStats = await Service.aggregate([
      { $group: { _id: "$solutionSet", count: { $sum: 1 } } },
    ]);
    const solutionSetBreakdown = {};
    solutionSetStats.forEach((s) => {
      solutionSetBreakdown[s._id] = s.count;
    });

    res.json({
      totalServices,
      activeServices,
      categoryBreakdown,
      solutionSetBreakdown,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getServiceManagement = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });

    // Add category and solution set details to each service
    const enrichedServices = services.map((service) => ({
      _id: service._id,
      name: service.name,
      category: service.category,
      solutionSet: service.solutionSet,
      isAvailable: service.isAvailable,
      price: service.price,
      createdAt: service.createdAt,
    }));

    res.json(enrichedServices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
