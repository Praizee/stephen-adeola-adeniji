import "./Navbar.css";
import Logo from "../../atoms/Logo";
import MobileNav from "../MobileNav/MobileNav";
import Separator from "../../atoms/Separator/Separator";

import globe from "/globe.svg";
import logout from "/logout.svg";
import profile from "/profile.svg";
import right from "/caret-right.svg";

const Navbar = () => {
  return (
    <div className="navbar">
      <Logo variant="white" />
      <Separator />
      <div className="nav_items">
        <a href="#" className="nav_text nav_text--active">
          Exchange
        </a>
        <a href="#" className="nav_text">
          Wallets
        </a>
        <a href="#" className="nav_text">
          Roqqu Hub
        </a>
      </div>

      {/* user profile */}
      <>
        <div className="profile profile--desktop">
          <div className="profile_card">
            <img
              className="profile_card--image"
              src={profile}
              alt="profile picture"
            />
            <p className="profile_card--text">Olakunle Temienor</p>

            <button className="profile_button">
              <img src={right} alt="right arrow" />
            </button>
          </div>

          <button className="profile_button">
            <img width={24} src={globe} alt="globe" />
          </button>

          <button className="profile_button">
            <img width={24} src={logout} alt="logout" />
          </button>
        </div>

        <div className="profile profile--mobile">
          <img
            className="profile_card--image"
            src={profile}
            alt="profile picture"
          />

          <button className="profile_button">
            <img width={24} src={globe} alt="globe" />
          </button>

          <MobileNav />
        </div>
      </>
    </div>
  );
};

export default Navbar;

