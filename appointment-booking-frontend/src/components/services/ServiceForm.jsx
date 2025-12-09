import { useState } from "react";
import { useApi } from "../../hooks/useApi";

export default function ServiceForm({ service = {}, onClose, onSave }) {
  const initialState = {
    name: service?.name || "",
    description: service?.description || "",
    duration: service?.duration || 40,
    price: service?.price || 400,
    category: service?.category || "",
    solutionSet: service?.solutionSet || "",
    specificCategory: service?.specificCategory || "",
    imageUrl: service?.imageUrl || "",
  };

  const [formData, setFormData] = useState(initialState);
  const { request, loading } = useApi();

  // **Dropdown Data from the Excel file**
  const categories = [
    "1) Health, Safety & Emergency Services",
    "4) Smart Home and Specific Purpose",
    "2) Security and Access",
    "3) Efficiency and Automation",
    "5) Programs",
  ];

  const solutionSets = [
    "Bed Exit Sensors",
    "Smart Appliances",
    "Automated Electric Vehicle (EV) Charging Station",
    "Fall Detection Sensors",
    "Fire Extinguishers & Suppression",
    "Motion Senor",
    "Security Cameras",
    "Smart Doorbell",
    "Smart Rodent Trap",
    "Smoke and Carbon Monoxide Detectors",
  ]; // **Truncated for brevity**

  const specificCategories = [
    "Smart Appliances - Electric Kettles",
    "Smart Appliances - Smart Air Fryers",
    "Smart Appliances - Smart Air Purifiers",
    "Smart Appliances - Smart Blenders",
    "Smart Appliances - Smart Coffee Makers",
    "Smart Appliances - Smart Cooktops",
  ]; // **Truncated for brevity**

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (service?._id) {
        await request("put", `/services/${service._id}`, formData);
      } else {
        await request("post", "/services", formData);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error("Service save failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">
          {service?._id ? "Edit Service" : "Add New Service"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Service Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Service Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-2 border rounded"
              rows="3"
              required
            />
          </div>

          {/* Duration & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: parseInt(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Price ($)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: parseFloat(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Solution Set Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Solution Set
            </label>
            <select
              value={formData.solutionSet}
              onChange={(e) =>
                setFormData({ ...formData, solutionSet: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            >
              <option value="" disabled>
                Select a solution set
              </option>
              {solutionSets.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Specific Category Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Specific Category
            </label>
            <select
              value={formData.specificCategory}
              onChange={(e) =>
                setFormData({ ...formData, specificCategory: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            >
              <option value="" disabled>
                Select a specific category
              </option>
              {specificCategories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="text"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
