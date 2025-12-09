const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
// const { getAllAppointments } = require("../controllers/appointments");

router.post(
  "/",
  auth,
  upload.single("file"),
  appointmentController.createAppointment
);
router.get("/all", auth, appointmentController.getAllAppointments);
router.get("/", auth, appointmentController.getAppointments);
router.put("/:id", auth, appointmentController.updateAppointment);

module.exports = router;
