import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../src/services/auth.api";

interface User {
  _id: string;
  username: string;
  email: string;
}

interface BuilderContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;

  loadingStatus: boolean;
  setLoadingStatus: React.Dispatch<React.SetStateAction<boolean>>;
  
  isInitializing: boolean;
}

export const BuilderContext = createContext<BuilderContextType | undefined>(
  undefined
);

export function useBuilder() {
  const context = useContext(BuilderContext);

  if (!context) {
    throw new Error("useBuilder must be used inside BuilderContextProvider");
  }

  return context;
}

export const BuilderContextProvider: React.FC<{
  children: React.ReactNode;  
}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const data = await getCurrentUser();
        if (data) {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        } else {
          setUser(null);
          localStorage.removeItem("user");
        }
      } catch (e) {
        setUser(null);
        localStorage.removeItem("user");
      } finally {
        setIsInitializing(false);
      }
    };
    checkUser();
  }, []);

  return (
    <BuilderContext.Provider
      value={{
        user,
        setUser,
        loadingStatus,
        setLoadingStatus,
        isInitializing,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};
