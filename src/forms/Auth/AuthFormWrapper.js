import { AuthForm as AuthFormClass } from "../forms/Auth/AuthForm";
import { useNavigate } from "react-router-dom";

export const AuthForm = (props) => {
  const navigate = useNavigate();
  return <AuthFormClass {...props} navigate={navigate} />;
};
