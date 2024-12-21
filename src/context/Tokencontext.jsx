import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Create the context for token
export let tokenContext = createContext();

export default function TokenProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  // Retrieve the token from localStorage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("userName");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken && storedUserName && storedUserId) {
      setToken(storedToken);
      setUserData({ id: storedUserId, name: storedUserName });
    }
  }, []);

  const updateToken = (newToken) => {
    if (newToken) {
      setToken(newToken);
      const { id, name, exp } = jwtDecode(newToken);

      // Check if token is expired
      if (exp && Date.now() / 1000 < exp) {
        setUserData({ id, name });
        localStorage.setItem("userName", name);
        localStorage.setItem("userId", id);
        localStorage.setItem("token", newToken); // Save the token to localStorage
      } else {
        // If the token is expired, clear it
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");
        setToken(null);
        setUserData(null);
      }
    }
  };

  const logout = () => {
    // Clear user session on logout
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    setToken(null);
    setUserData(null);
  };

  return (
    <tokenContext.Provider
      value={{ token, setToken, updateToken, userData, setUserData, logout }}
    >
      {children}
    </tokenContext.Provider>
  );
}
