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

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/api/user");
      const data = await response.json();
      setUser(data);
    };

    fetchUserData();
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
