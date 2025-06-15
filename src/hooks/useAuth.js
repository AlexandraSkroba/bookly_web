import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    fetch("http://localhost:3001/auth/status", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setIsAuthenticated(!!data?.user);
        setLoading(false);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  return { isAuthenticated, loading };
};
