//context/TripsContext.js
import React, { createContext, useContext, useState } from "react";

const TripsContext = createContext(null);

export function TripsProvider({ children }) {
  const [trips, setTrips] = useState([]);

  const addTrip = (trip) => {
    setTrips((prev) => [trip, ...prev]); // último viaje primero
  };

  return (
    <TripsContext.Provider value={{ trips, addTrip }}>
      {children}
    </TripsContext.Provider>
  );
}

export function useTrips() {
  const ctx = useContext(TripsContext);
  if (!ctx) {
    throw new Error("useTrips debe usarse dentro de TripsProvider");
  }
  return ctx;
}
