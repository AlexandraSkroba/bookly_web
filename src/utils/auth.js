export async function fetchAuthStatus() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const res = await fetch("http://localhost:3001/auth/status", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    const data = await res.json();
    return data.user;
  }

  return null;
}
