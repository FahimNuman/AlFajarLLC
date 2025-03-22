// eslint-disable-next-line no-unused-vars
import React from "react";
import { BsCollection } from "react-icons/bs";
import { FaRegWindowClose } from "react-icons/fa";
import { SiGooglehome, SiMaildotcom } from "react-icons/si";
import { Link, NavLink } from "react-router-dom";
// import logo from "/src/assets/logo.png";

const Navbar = ({ containerStyles, toggleMenu, menuOpened }) => {
  const navItems = [
    { to: "/", label: "Home", icon: <SiGooglehome /> },
    { to: "/collection", label: "Collection", icon: <BsCollection /> },
    // {to: '/about', label:"About", icon:<SiAtlassian/>},
    { to: "/contact", label: "Contact", icon: <SiMaildotcom /> },
  ];
  return (
    <nav className={containerStyles}>
      {menuOpened && (
        <>
          <FaRegWindowClose
            onClick={toggleMenu}
            className="text-xl self-end cursor-pointer relative left-8 text-red-500"
          />

          {/* Logo for larger screens */}
          <Link to={"/"} className="bold-24 flex-1 hidden xl:flex">
            <h4 className="text-red-500 flex justify-center items-center  w-auto px-2 relative">
              {/* Logo */}
              {/* <img
                src={logo}
                alt="Risikder Logo"
                className="logo-img"
                style={{
                  height: "20px",
                  width: "auto",
                  marginRight: "8px",
                  display: "inline-block",
                }}
              /> */}
              {/* Text */}
              <span
                className="corporation-text"
                style={{
                  fontWeight: "500",
                  color: "#2B2B2B",
                  fontSize: "1rem",
                  display: "inline-block",
                }}
              >
                Alfajor LLC
              </span>
            </h4>
          </Link>
        </>
      )}
      {navItems.map(({ to, label, icon }) => (
        <div key={label}>
          <NavLink
            to={to}
            className={({ isActive }) =>
              isActive ? "active-link flexCenter gap-x-2" : "flexCenter gap-x-2"
            }
            onClick={menuOpened && toggleMenu}
          >
            {icon}
            <h5 className="medium-16">{label}</h5>
          </NavLink>
        </div>
      ))}
    </nav>
  );
};

export default Navbar;