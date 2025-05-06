const API_URL = process.env.API_URL || "http://localhost:3001";

const API_ENDPOINTS = {
  signUp: `${API_URL}/auth/signup`,
  googleSignUp: `${API_URL}/auth/google/login`,
  login: `${API_URL}/auth/login`,
};

export default API_ENDPOINTS;
