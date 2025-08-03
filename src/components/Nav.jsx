import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Nav.css";
import backGroundIMG from "../styles/assets/movieWallArt.jpeg";
import audienceLogo from '../styles/assets/logo-png.png';

const Nav = () => {
  return (
    <nav className="nav-bar">
      <img className="App__logo" src={audienceLogo} />
      <div className="nav-description-container">
      <h2 className="nav-description">Thousands of <span className="yellow">FREE</span> movies to watch!</h2>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Search
          </NavLink>
        </li>
      </ul>
      <img className="nav-bar__img" src={backGroundIMG} alt="" />
    </nav>
  );
};

export default Nav;
