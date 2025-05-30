import React from "react";
import type { InputHTMLAttributes } from "react";
import "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "filled";
}

const Input: React.FC<InputProps> = ({
  variant = "default",
  className = "",
  ...props
}) => {
  const inputClasses = `input input--${variant} ${className}`;
  return <input className={inputClasses} {...props} />;
};

export default Input;

