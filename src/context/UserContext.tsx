"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define User Type
interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  cardNumber: string;
  income: number;
  expenses: number;
}

// Context Default Values
const defaultUser: User = {
  id: "",
  name: "Guest",
  email: "",
  balance: 0,
  cardNumber: "XXXX XXXX XXXX XXXX",
  income: 0,
  expenses: 0,
};

// Create Context
const UserContext = createContext<{ user: User; setUser: (user: User) => void }>({
  user: defaultUser,
  setUser: () => {},
});

// Provider Component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);

  // Simulate fetching user data (Replace with real API call)
  useEffect(() => {
    const fetchUserData = async () => {
      // Example: Replace this with API call
      const response = await fetch("/api/user");
      const data = await response.json();
      setUser(data);
    };

    fetchUserData();
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

// Custom Hook for easy access
export const useUser = () => useContext(UserContext);
