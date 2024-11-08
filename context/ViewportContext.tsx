"use client"

import { createContext, useContext, useState, useEffect } from "react";

type ViewportContextType = number;

const ViewportContext = createContext<ViewportContextType | undefined>(undefined);

export const ViewportProvider = ({ children }: {children: React.ReactNode}) => {
  
  // If set 0, error will be thrown thus init width with -1
  const [windowWidth, setWindowWidth] = useState(-1);

  useEffect(() => {
    // Check if window is defined (i.e., we are in the browser)
    if (typeof window !== 'undefined') {

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      // Set initial width
      handleResize();

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <ViewportContext.Provider 
      value={windowWidth}
    >
      {children}
    </ViewportContext.Provider>
  )
}

export const useViewport = (): ViewportContextType => {
  const context = useContext(ViewportContext);

  if (!context) {
    throw new Error("useViewport must be used within a ViewportProvider");
  }

  return context;
}