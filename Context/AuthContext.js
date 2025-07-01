import { createContext, useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [mobile, setMobile] = useState(null);
  useEffect(() => {
    const savedMobile = Cookies.get("user_mobile");
    if (savedMobile) setMobile(savedMobile);
  }, []);
  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("user_mobile");
    setMobile(null);
  };
  return (
    <AuthContext.Provider value={{ mobile, setMobile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
