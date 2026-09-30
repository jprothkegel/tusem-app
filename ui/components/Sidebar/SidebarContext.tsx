"use client";

import { createContext, useState, useContext } from "react";

type SidebarContextType = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        toggle: () => setIsOpen((prev) => !prev),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidaber must be used within SidebarProvider");
  return ctx;
};
