import React from "react";
import API_ENDPOINTS from "../../apiConfig";

export const GoogleAuthButton = () => {
  const handleGoogleSignup = () => {
    window.location.href = API_ENDPOINTS.googleSignUp;
  };

  return (
    <button className="btn btn-google" onClick={handleGoogleSignup}>
      Continue with Google{" "}
      <img src="/google-icon.svg" alt="Icon" className="btn-icon" />
    </button>
  );
};
