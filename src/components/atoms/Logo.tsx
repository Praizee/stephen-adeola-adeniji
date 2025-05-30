import whiteLogo from "/logo-white.svg";
import blackLogo from "/logo-black.svg";
import type { FC } from "react";

type LogoProps = {
  variant: "white" | "black";
};

const Logo: FC<LogoProps> = ({ variant }) => {
  return (
    <div>
      {variant === "white" && <img src={whiteLogo} alt="Sisyphus Logo" />}
      {variant === "black" && <img src={blackLogo} alt="Sisyphus Logo" />}
    </div>
  );
};

export default Logo;

