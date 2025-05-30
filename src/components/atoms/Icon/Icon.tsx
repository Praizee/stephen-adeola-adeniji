import React from "react";
import type { SVGProps } from "react";
import "./Icon.css";

import {
  FaArrowUp,
  FaArrowDown,
  FaCog,
  FaPlus,
  FaUser,
  FaWallet,
} from "react-icons/fa";
// import { MdArrowUpward } from 'react-icons/md';

type IconName =
  | "arrow-up"
  | "arrow-down"
  | "settings"
  | "plus"
  | "user"
  | "wallet";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: "small" | "medium" | "large" | string;
  color?: "default" | "primary" | "success" | "danger" | "muted" | "inverted";
}

const Icon: React.FC<IconProps> = ({
  name,
  size = "medium",
  color = "default",
  className = "",
  ...props
}) => {
  const iconClasses = `icon icon--size-${size} icon--color-${color} ${className}`;
  const style: React.CSSProperties =
    typeof size === "string" && !["small", "medium", "large"].includes(size)
      ? { width: size, height: size }
      : {};

  const IconComponent = {
    "arrow-up": FaArrowUp,
    "arrow-down": FaArrowDown,
    settings: FaCog, // FaCog is for settings/gear icon
    plus: FaPlus,
    user: FaUser,
    wallet: FaWallet,
  }[name];

  if (!IconComponent) {
    console.warn(
      `Icon '${name}' not found. Please check IconName type and IconComponent mapping.`
    );
    return null;
  }

  return <IconComponent className={iconClasses} style={style} {...props} />;
};

export default Icon;

