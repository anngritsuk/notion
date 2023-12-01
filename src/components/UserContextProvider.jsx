import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { Api } from "../utils/api";

export const UserContext = createContext(null);
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const id = localStorage.getItem("userId");
      if (id) {
        try {
          const res = await Api.getUser({ id });
          setUser(res);
        } catch (error) {
          throw error;
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem("userId", user.id);
    } else {
      localStorage.removeItem("userId");
    }
  }, [user?.id]);
  return (
    <UserContext.Provider value={{ user, onChange: setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
