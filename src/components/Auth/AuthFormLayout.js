import React from "react";
import { useNavigate } from "react-router-dom";

export const AuthFormLayout = ({ title, children, bottomText }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div>
      <h1 className="headline" onClick={handleLogoClick}>
        BOOKLY
      </h1>
      <div className="container-signup">
        <h2 className="title">{title}</h2>
        <p className="p-start">to get started</p>
        {children}
        {bottomText && <p className="p-login">{bottomText}</p>}
      </div>
    </div>
  );
};
