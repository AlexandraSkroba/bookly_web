import { AuthForm } from "../forms/Auth/AuthForm";
import API_ENDPOINTS from "../apiConfig";
import "./Auth.css"
import { Link } from "react-router-dom";

export const SignUp = () => {
  return (
    <AuthForm
      mode="signup"
      apiEndpoint={API_ENDPOINTS.signUp}
      title="Sign Up"
      bottomText={
        <span>
          Already registered?{" "}
          <Link to="/login" className="p-login">
            <b>Login</b>
          </Link>
        </span>
      }
    />
  );
};
