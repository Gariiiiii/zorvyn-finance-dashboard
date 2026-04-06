import { createContext, useEffect, useState } from "react";
export const UserContext = createContext(); 

export function UserProvider({ children }) {
  const [user, setUser] = useState({ role: "viewer" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const saveUser = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  return (
    <UserContext.Provider value={{ user, saveUser }}>
      {children}
    </UserContext.Provider>
  );
}