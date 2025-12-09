import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const CreateAppointment = ({ serviceId, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    service: serviceId,
    date: "",
    message: "",
    file: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });

    try {
      await api.post("/appointments", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onClose();
      navigate("/appointments");
    } catch (error) {
      console.error("Failed to create appointment:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Book Appointment</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ×
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Date and Time
          </label>
          <input
            type="datetime-local"
            className="w-full p-2 border rounded"
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            className="w-full p-2 border rounded"
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Attachment</label>
          <input
            type="file"
            className="w-full p-2 border rounded"
            onChange={(e) =>
              setFormData({ ...formData, file: e.target.files[0] })
            }
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default CreateAppointment;
