import { createContext, useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [mobile, setMobile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const savedMobile = Cookies.get("user_mobile");
    if (savedMobile) setMobile(savedMobile);
  }, []);

  // 🎯 گوش دادن به unauthorized از axios
  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
     
    };

    window.addEventListener("unauthorized", handleUnauthorized);
    return () => {
      window.removeEventListener("unauthorized", handleUnauthorized);
    };
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
