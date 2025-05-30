import type { ElementType, HTMLAttributes } from "react";
import "./Typography.css";

type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body1"
  | "body2"
  | "caption"
  | "label";

type Color =
  | "default"
  | "primary"
  | "success"
  | "danger"
  | "muted"
  | "inverted";
type Weight = "light" | "normal" | "medium" | "semibold" | "bold";
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type TextTag = "p" | "span" | "div";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: Variant;
  component?: HeadingTag | TextTag;
  color?: Color;
  weight?: Weight;
}

const Typography = ({
  children,
  variant = "body1",
  component,
  color = "default",
  weight = "normal",
  className = "",
  ...props
}: TypographyProps) => {
  const defaultTag = variant.startsWith("h") ? (variant as HeadingTag) : "p";
  const Component = (component || defaultTag) as ElementType;

  const typographyClasses = [
    "typography",
    `typography--${variant}`,
    `typography-color-${color}`,
    `typography--weight-${weight}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={typographyClasses} {...props}>
      {children}
    </Component>
  );
};

export default Typography;

