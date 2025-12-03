import { createContext, useState, useEffect } from "react";
import { getUserById } from "../services/userService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userJson = sessionStorage.getItem("user");
    if (userJson) {
      const fetchUser = async () => {
        try {
          const userObject = JSON.parse(userJson);
          const response = await getUserById(userObject.id);
          setCurrentUser(response.data);
        } catch (e) {
          console.error(e);
          sessionStorage.removeItem("user");
          setCurrentUser(null);
        } finally {
          setIsLoading(false);
        }
      };
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
