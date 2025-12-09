import { useState, useEffect } from "react";
import api from "../../services/api";
import ServiceCard from "./ServiceCard";

// Spinner component
const Spinner = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Error message component
const ErrorMessage = ({ message }) => (
  <div className="text-center py-8 text-red-600">
    <p>{message}</p>
  </div>
);

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const servicesPerPage = 5;

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [categories, setCategories] = useState([]);
  const [solutionSets, setSolutionSets] = useState([]);
  const [specificCategories, setSpecificCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSolutionSet, setSelectedSolutionSet] = useState("");
  const [selectedSpecificCategory, setSelectedSpecificCategory] = useState("");
  

  useEffect(() => {
    fetchServices();
    fetchFilters();
  }, [
    currentPage,
    searchQuery,
    selectedCategory,
    selectedSolutionSet,
    selectedSpecificCategory,
  ]);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const query = searchQuery ? `&q=${searchQuery}` : "";
      const categoryFilter = selectedCategory
        ? `&category=${selectedCategory}`
        : "";
      const solutionSetFilter = selectedSolutionSet
        ? `&solutionSet=${selectedSolutionSet}`
        : "";
      const specificCategoryFilter = selectedSpecificCategory
        ? `&specificCategory=${selectedSpecificCategory}`
        : "";

      const response = await api.get(
        `/services?page=${currentPage}&limit=${servicesPerPage}${query}${categoryFilter}${solutionSetFilter}${specificCategoryFilter}`
      );

      console.log("API Response:", response.data); // Debugging API response

      if (response.data.success) {
        setServices(response.data.data || []);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
      setError("Failed to load services. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFilters = async () => {
    try {
      const response = await api.get("/services"); // Fetch all services to extract filters
      if (response.data.success) {
        const uniqueCategories = [
          ...new Set(response.data.data.map((service) => service.category)),
        ];
        const uniqueSolutionSets = [
          ...new Set(response.data.data.map((service) => service.solutionSet)),
        ];
        const uniqueSpecificCategories = [
          ...new Set(
            response.data.data.map((service) => service.specificCategory)
          ),
        ];

        setCategories(uniqueCategories);
        setSolutionSets(uniqueSolutionSets);
        setSpecificCategories(uniqueSpecificCategories);
      }
    } catch (error) {
      console.error("Failed to fetch filter data:", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container mx-auto px-4">
      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded"
        />

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Solution Set Filter */}
        <select
          value={selectedSolutionSet}
          onChange={(e) => setSelectedSolutionSet(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Solution Sets</option>
          {solutionSets.map((solutionSet, index) => (
            <option key={index} value={solutionSet}>
              {solutionSet}
            </option>
          ))}
        </select>

        {/* Specific Category Filter */}
        <select
          value={selectedSpecificCategory}
          onChange={(e) => setSelectedSpecificCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Specific Categories</option>
          {specificCategories.map((specificCategory, index) => (
            <option key={index} value={specificCategory}>
              {specificCategory}
            </option>
          ))}
        </select>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(services) && services.length > 0 ? (
          services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No services available.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 rounded bg-gray-300 hover:bg-gray-400"
        >
          Previous
        </button>
        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 rounded bg-gray-300 hover:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ServiceList;
