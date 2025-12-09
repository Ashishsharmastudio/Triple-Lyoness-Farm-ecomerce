import { useState, useEffect } from "react";
import api from "../services/api";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAppointment, setEditingAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get("/appointments");
      setAppointments(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleUpdateAppointment = async (appointmentId) => {
    try {
      const response = await api.put(`/appointments/${appointmentId}`, {
        date: editingAppointment.date,
        message: editingAppointment.message,
        status: editingAppointment.status,
      });

      if (response.data) {
        setAppointments(
          appointments.map((appointment) =>
            appointment._id === appointmentId ? response.data : appointment
          )
        );
        setEditingAppointment(null);
      }
    } catch (error) {
      console.error("Failed to update appointment:", error);
    }
  };

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      const response = await api.put(`/appointments/${appointmentId}`, {
        status: newStatus,
      });

      if (response.data) {
        setAppointments(
          appointments.map((appointment) =>
            appointment._id === appointmentId ? response.data : appointment
          )
        );
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Appointments</h1>

      <div className="grid gap-6">
        {appointments.map((appointment) => (
          <div key={appointment._id} className="bg-white rounded-lg shadow p-6">
            {editingAppointment &&
            editingAppointment._id === appointment._id ? (
              <div className="space-y-4">
                <input
                  type="datetime-local"
                  value={editingAppointment.date.slice(0, 16)}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      date: e.target.value,
                    })
                  }
                  className="border p-2 rounded w-full"
                />
                <textarea
                  value={editingAppointment.message}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      message: e.target.value,
                    })
                  }
                  className="border p-2 rounded w-full"
                  placeholder="Special requests"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUpdateAppointment(appointment._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditingAppointment(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">
                    {appointment.service.name}
                  </h3>
                  <p className="text-gray-600 mt-1">{appointment.message}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Date:</span>{" "}
                      {formatDate(appointment.date)}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Status:</span>{" "}
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          appointment.status === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : appointment.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="space-x-2">
                  {appointment.status === "Confirmed" && (
                    <>
                      <button
                        onClick={() =>
                          handleStatusUpdate(appointment._id, "Pending")
                        }
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                      >
                        Mark as Pending
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdate(appointment._id, "Cancelled")
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setEditingAppointment(appointment)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
