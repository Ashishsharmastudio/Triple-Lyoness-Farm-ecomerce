import { createContext, useState, useContext } from "react";
import { useApi } from "../hooks/useApi";

const AppointmentContext = createContext();

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([]);
  const { request, loading } = useApi();

  const fetchAppointments = async () => {
    try {
      const data = await request("get", "/appointments");
      setAppointments(data);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };

  const createAppointment = async (appointmentData) => {
    try {
      await request("post", "/appointments", appointmentData);
      await fetchAppointments();
    } catch (error) {
      throw error;
    }
  };

  const updateAppointment = async (id, updates) => {
    try {
      await request("put", `/appointments/${id}`, updates);
      await fetchAppointments();
    } catch (error) {
      throw error;
    }
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        loading,
        fetchAppointments,
        createAppointment,
        updateAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  return useContext(AppointmentContext);
}
