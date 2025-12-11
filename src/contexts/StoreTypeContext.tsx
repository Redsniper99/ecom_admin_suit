"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type StoreType = "clothing" | "electronics";

interface StoreTypeContextType {
  storeType: StoreType;
  setStoreType: (type: StoreType) => void;
}

const StoreTypeContext = createContext<StoreTypeContextType | undefined>(undefined);

export function StoreTypeProvider({ children }: { children: ReactNode }) {
  const [storeType, setStoreType] = useState<StoreType>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("storeType");
      return (saved as StoreType) || "clothing";
    }
    return "clothing";
  });

  useEffect(() => {
    localStorage.setItem("storeType", storeType);
  }, [storeType]);

  return (
    <StoreTypeContext.Provider value={{ storeType, setStoreType }}>
      {children}
    </StoreTypeContext.Provider>
  );
}

export function useStoreType() {
  const context = useContext(StoreTypeContext);
  if (context === undefined) {
    throw new Error("useStoreType must be used within a StoreTypeProvider");
  }
  return context;
}
