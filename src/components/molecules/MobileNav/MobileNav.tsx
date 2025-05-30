import "./MobileNav.css";
import menu from "/menu.svg";
import { useState } from "react";

const MobileNav = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  return (
    <>
      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="profile_button menu"
      >
        <img width={24} src={menu} alt="menu" />

        <div
          className={`menu-dropdown ${
            dropdownOpen ? "" : "menu-dropdown--hidden"
          }`}
        >
          <button className="dropdown-item">Exchange</button>
          <button className="dropdown-item">Wallets</button>
          <button className="dropdown-item">Roqqu Hub</button>
          <button className="dropdown-item">Log out</button>
        </div>
      </div>

      {dropdownOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setDropdownOpen(false);
          }}
          className="menu-backdrop"
        />
      )}
    </>
  );
};

export default MobileNav;

