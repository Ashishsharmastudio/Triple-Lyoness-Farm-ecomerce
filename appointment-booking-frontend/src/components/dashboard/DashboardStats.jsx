import { useEffect, useState } from "react";
import api from "../../services/api";

export default function DashboardStats() {
  const [stats, setStats] = useState({
    totalServices: 0,
    totalAppointments: 0,
    activeServices: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/dashboard/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-500 text-sm">Total Services</h3>
        <p className="text-3xl font-bold">{stats.totalServices}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-500 text-sm">Active Services</h3>
        <p className="text-3xl font-bold">{stats.activeServices}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-500 text-sm">Total Appointments</h3>
        <p className="text-3xl font-bold">{stats.totalAppointments}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-500 text-sm">Total Revenue</h3>
        <p className="text-3xl font-bold">${stats.totalRevenue}</p>
      </div>
    </div>
  );
}
