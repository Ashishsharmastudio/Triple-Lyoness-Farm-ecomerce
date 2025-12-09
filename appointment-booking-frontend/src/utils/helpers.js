export const formatDate = (date) => {
  return new Date(date).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const calculateTimeSlots = (startTime, endTime, duration) => {
  const slots = [];
  let currentTime = new Date(startTime);
  const end = new Date(endTime);

  while (currentTime < end) {
    slots.push(new Date(currentTime));
    currentTime.setMinutes(currentTime.getMinutes() + duration);
  }

  return slots;
};

export const validateAppointment = (appointment) => {
  const errors = {};

  if (!appointment.service) {
    errors.service = "Service is required";
  }

  if (!appointment.date) {
    errors.date = "Date is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
