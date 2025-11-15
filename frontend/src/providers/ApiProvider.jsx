import React, { createContext, useContext } from "react";


const ApiContext = createContext();


export const useApi = () => {
  return useContext(ApiContext);
};


export const ApiProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1"; // <-- your API base URL here

  return (
    <ApiContext.Provider value={{ baseUrl }}>{children}</ApiContext.Provider>
  );
};
