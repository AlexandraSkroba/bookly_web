import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetch("http://localhost:3001/auth/status", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
          } else {
            logout();
          }
        })
        .catch(() => logout());
    }
  }, [token]);

  const login = async (email, password) => {
    console.log("hsdfjhsk   f");
    const res = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    debugger;
    const data = await res.json();
    debugger;
    if (res.ok) {
      localStorage.setItem("token", data.access_token);
      setToken(data.access_token);
      navigate("/catalog");
    } else {
      throw new Error(data.message || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isAuth: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
