const Appointment = require("../models/Appointment");
const cloudinary = require("../config/cloudinary");

exports.createAppointment = async (req, res) => {
  try {
    const { service, date, message } = req.body;
    let fileUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      fileUrl = result.secure_url;
    }

    const appointment = new Appointment({
      user: req.user.userId,
      service,
      date,
      message,
      fileUrl,
    });

    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.userId })
      .populate("service")
      .sort({ date: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true }
    );
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Add this new controller function
exports.getAllAppointments = async (req, res) => {
  try {
    // Check if user is admin/owner
    if (req.user.role !== "owner") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }

    const appointments = await Appointment.find()
      .populate("user", "name email phone")
      .populate("service", "name price duration")
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching appointments",
      error: error.message,
    });
  }
};

