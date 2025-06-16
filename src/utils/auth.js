export const fetchAuthStatus = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const res = await fetch("http://localhost:3001/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.user;
  } catch (err) {
    console.error("Failed to fetch auth status:", err);
    return null;
  }
};
