const Service = require("../models/Service");
const {
  formatSuccessResponse,
  formatErrorResponse,
} = require("../utils/helpers");

// 📌 Create a new service
exports.createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    const savedService = await service.save();
    res.status(201).json(formatSuccessResponse(savedService));
  } catch (error) {
    res.status(400).json(formatErrorResponse(error.message, 400));
  }
};

// 📌 Get all services with filtering & pagination
exports.getAllServices = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50, // Increased limit for products
      category,
      search,
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    let filter = {}; // Show all by default (let frontend filter status if needed)

    // Optional: Filter by status if requested, otherwise return all for Admin
    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (category && category !== 'All') filter.category = category;
    if (search) filter.name = { $regex: search, $options: "i" };

    const services = await Service.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ name: 1 });
    const total = await Service.countDocuments(filter);

    res.json({
      success: true,
      data: services,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalServices: total,
    });
  } catch (error) {
    res.status(500).json(formatErrorResponse(error.message, 500));
  }
};

// 📌 Get service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service)
      return res
        .status(404)
        .json(formatErrorResponse("Service not found", 404));

    res.json(formatSuccessResponse(service));
  } catch (error) {
    res.status(500).json(formatErrorResponse(error.message, 500));
  }
};

// 📌 Update service
exports.updateService = async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedService)
      return res
        .status(404)
        .json(formatErrorResponse("Service not found", 404));

    res.json(formatSuccessResponse(updatedService));
  } catch (error) {
    res.status(400).json(formatErrorResponse(error.message, 400));
  }
};

// 📌 Soft delete a service
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res
        .status(404)
        .json(formatErrorResponse("Service not found", 404));
    }

    res.json(
      formatSuccessResponse({ message: "Service deleted successfully" })
    );
  } catch (error) {
    res.status(500).json(formatErrorResponse(error.message, 500));
  }
};


// 📌 Search services with pagination
exports.searchServices = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const filter = {
      $or: [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ],
    };

    const services = await Service.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ name: 1 });
    const total = await Service.countDocuments(filter);

    res.json({
      success: true,
      data: services,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalServices: total,
    });
  } catch (error) {
    res.status(500).json(formatErrorResponse(error.message, 500));
  }
};

// 📌 Get services by category
exports.getServicesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const services = await Service.find({ category });
    res.json(formatSuccessResponse(services));
  } catch (error) {
    res.status(500).json(formatErrorResponse(error.message, 500));
  }
};

// 📌 Get services by solution set (Legacy support, maybe optional)
exports.getServicesBySolutionSet = async (req, res) => {
  try {
    // Kept for route compatibility, but might return empty
    const { solutionSet } = req.params;
    const services = await Service.find({ solutionSet });
    res.json(formatSuccessResponse(services));
  } catch (error) {
    res.status(500).json(formatErrorResponse(error.message, 500));
  }
};

// 📌 Get home-specific programs (Legacy)
exports.getHomeSpecificPrograms = async (req, res) => {
  res.json({ success: true, data: [] });
};

// 📌 Get smart appliances (Legacy)
exports.getSmartAppliances = async (req, res) => {
  res.json({ success: true, data: [] });
};

// 📌 Get advanced systems (Legacy)
exports.getAdvancedSystems = async (req, res) => {
  res.json({ success: true, data: [] });
};

// 📌 Bulk update service prices
exports.bulkUpdatePrices = async (req, res) => {
  try {
    const { updates } = req.body;
    if (!Array.isArray(updates))
      return res
        .status(400)
        .json(formatErrorResponse("Invalid input format", 400));

    const updatedServices = await Promise.all(
      updates.map(async (update) => {
        return await Service.findByIdAndUpdate(
          update.serviceId,
          { price: update.newPrice },
          { new: true }
        );
      })
    );

    res.json(formatSuccessResponse(updatedServices.filter((s) => s !== null)));
  } catch (error) {
    res.status(400).json(formatErrorResponse(error.message, 400));
  }
};
