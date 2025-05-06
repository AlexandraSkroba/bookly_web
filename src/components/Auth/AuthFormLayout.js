import React from "react";

export const AuthFormLayout = ({ title, children, bottomText }) => {
  return (
    <div>
      <h1 className="headline">BOOKLY</h1>
      <div className="container-signup">
        <h2 className="title">{title}</h2>
        <p className="p-start">to get started</p>
        {children}
        {bottomText && <p className="p-login">{bottomText}</p>}
      </div>
    </div>
  );
};
