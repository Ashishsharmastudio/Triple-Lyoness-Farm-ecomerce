import { useState } from "react";
import api from "../../services/api";

const AppointmentCard = ({ appointment, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    status: appointment.status,
    date: appointment.date,
    message: appointment.message,
    confirmAttendance: false,
  });

  const handleUpdate = async () => {
    try {
      await api.put(`/appointments/${appointment._id}`, formData);
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error("Failed to update appointment:", error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {!isEditing ? (
        <>
          <div className="flex justify-between">
            <h3 className="font-semibold">{appointment.service.name}</h3>
            <span
              className={`px-2 py-1 rounded text-sm ${
                appointment.status === "Confirmed"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {appointment.status}
            </span>
          </div>
          <p className="text-gray-600 mt-2">
            {new Date(appointment.date).toLocaleString()}
          </p>
          <p className="mt-2">{appointment.message}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 text-blue-600"
          >
            Edit Appointment
          </button>
        </>
      ) : (
        <div className="space-y-4">
          <input
            type="datetime-local"
            value={formData.date.split(".")[0]}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <textarea
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.confirmAttendance}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmAttendance: e.target.checked,
                })
              }
              className="mr-2"
            />
            <label>Confirm Attendance</label>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
