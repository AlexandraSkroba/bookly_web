import { AuthForm } from "../forms/Auth/AuthForm";
import API_ENDPOINTS from "../apiConfig";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <AuthForm
      mode="login"
      login={login}
      navigate={navigate}
      apiEndpoint={API_ENDPOINTS.login}
      title="Login"
      showForgotPassword={true}
      bottomText={
        <span>
          New User?{" "}
          <Link to="/signup" className="p-login">
            <b>Register</b>
          </Link>
        </span>
      }
    />
  );
};
