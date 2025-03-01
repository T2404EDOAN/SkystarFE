import React, { createContext, useState, useContext, useEffect } from "react";

interface User {
  id: number;
  email: string;
  fullName: string;
  phoneNumber?: string;
  dateOfBirth?: string;
}
interface Theater {
  id: number;
  name: string;
  address: string;
}
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
  setSelectedTheater: (theater: Theater) => void;
  clearSelectedTheater: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [selectedTheater, setSelectedTheater] = useState<Theater | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const theaterData = localStorage.getItem("selectedTheater");
    if (userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
    if (theaterData) {
      setSelectedTheater(JSON.parse(theaterData));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  // Add updateUser function
  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  const handleSetSelectedTheater = (theater: Theater) => {
    setSelectedTheater(theater);
    localStorage.setItem("selectedTheater", JSON.stringify(theater));
    console.log("Theater selected:", theater);
  };

  const handleClearSelectedTheater = () => {
    setSelectedTheater(null);
    localStorage.removeItem("selectedTheater");
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        selectedTheater,
        login,
        logout,
        updateUser,
        setSelectedTheater: handleSetSelectedTheater,
        clearSelectedTheater: handleClearSelectedTheater,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
