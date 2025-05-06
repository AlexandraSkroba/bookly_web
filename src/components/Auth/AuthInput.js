import React from "react";

export const AuthInput = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
}) => (
  <>
    <input
      className="input-field"
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {error && <div className="error-text">{error}</div>}
  </>
);
