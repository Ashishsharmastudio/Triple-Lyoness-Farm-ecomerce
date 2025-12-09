import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../services/api";

export default function AppointmentForm() {
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("serviceId");
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
      data.append(key, formData[key]);
    });

    try {
      await api.post("/appointments", data);
      navigate("/appointments");
    } catch (error) {
      console.error("Failed to create appointment:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Book Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Date and Time
          </label>
          <input
            type="datetime-local"
            className="w-full p-2 border rounded"
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea
            className="w-full p-2 border rounded"
            rows="4"
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Attachment</label>
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
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}
