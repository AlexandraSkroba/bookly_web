import { AuthForm } from "../forms/Auth/AuthForm";
import API_ENDPOINTS from "../apiConfig";
import "./Auth.css";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <AuthForm
      mode="login"
      apiEndpoint={API_ENDPOINTS.login}
      title="Login"
      showForgotPassword={true}
      bottomText={
        <span>
          New User?{" "}
          <Link to="/" className="p-login">
            <b>Register</b>
          </Link>
        </span>
      }
    />
  );
};
