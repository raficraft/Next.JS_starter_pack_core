import React, { createContext, useState } from "react";

export const DashboardContext = createContext();

export default function DashboardProvider({ children }) {
  /**
   * Modal Initial Context
   */
  const [tabs, setTabs] = useState("edit");

  function handleTabs(target) {
    setTabs(target);
  }

  return (
    <DashboardContext.Provider value={{ tabs, handleTabs }}>
      {children}
    </DashboardContext.Provider>
  );
}
