import { useState, useEffect } from "react";
import api from "../../services/api";
import ServiceForm from "../services/ServiceForm";

export default function ServiceManagement() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get("/dashboard/services");
      setServices(response.data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  };

  const handleDelete = async (serviceId) => {
    try {
      await api.delete(`/services/${serviceId}`);
      fetchServices();
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Service Management</h2>
        <button
          onClick={() => setEditingService({})}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add New Service
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{service.name}</h3>
              <p className="text-gray-600">{service.description}</p>
              <p className="text-sm">
                ${service.price} • {service.duration} mins
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingService(service)}
                className="bg-gray-100 px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(service._id)}
                className="bg-red-100 text-red-600 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingService && (
        <ServiceForm
          service={editingService}
          onClose={() => setEditingService(null)}
          onSave={fetchServices}
        />
      )}
    </div>
  );
}
