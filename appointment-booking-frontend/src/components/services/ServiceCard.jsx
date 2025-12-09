import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import CreateAppointment from "../appointments/CreateAppointment";

const ServiceCard = ({ service }) => {
  const [showBooking, setShowBooking] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setShowBooking(true);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-bold">${service.price}</span>
        <span className="text-sm text-gray-500">{service.duration} mins</span>
      </div>
      <button
        onClick={handleBookNow}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Book Now
      </button>

      {showBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full m-4">
            <CreateAppointment
              serviceId={service._id}
              onClose={() => setShowBooking(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
