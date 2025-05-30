import React from "react";
import type { ButtonHTMLAttributes } from "react";

import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "success" | "danger";
  size?: "small" | "medium" | "large";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  className = "",
  ...props
}) => {
  const buttonClasses = `button button--<span class="math-inline">\{variant\} button\-\-</span>{size} ${className}`;
  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;

