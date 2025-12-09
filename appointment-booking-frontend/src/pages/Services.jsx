import { useState, useEffect } from "react";
import ServiceList from "../components/services/ServiceList";

// Spinner component
const Spinner = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const Services = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);

  // Simulate data fetching
  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/services');
        // const data = await response.json();

        // Simulated delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const mockData = [
          { id: 1, name: "Service 1" },
          { id: 2, name: "Service 2" },
          { id: 3, name: "Service 3" },
        ];

        setServices(mockData);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Our Services</h1>

      {isLoading ? <Spinner /> : <ServiceList services={services} />}
    </div>
  );
};

export default Services;
