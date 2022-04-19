import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <nav className="header">
      <NavLink
        to="/"
        exact
        className={({ isActive }) => (isActive ? "tab active-tab" : "tab")}
      >
        Home
      </NavLink>
      <NavLink
        to="/discussionboard"
        className={({ isActive }) => (isActive ? "tab active-tab" : "tab")}
      >
        Discussion Board
      </NavLink>
      <NavLink
        to="/animereview"
        className={({ isActive }) => (isActive ? "tab active-tab" : "tab")}
      >
        Anime Review
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? "tab active-tab" : "tab")}
      >
        Movies
      </NavLink>
      <NavLink
        to="/convo"
        className={({ isActive }) => (isActive ? "tab active-tab" : "tab")}
      >
        Convo
      </NavLink>
      <NavLink
        to="/memes"
        className={({ isActive }) => (isActive ? "tab active-tab" : "tab")}
      >
        Memes
      </NavLink>               
    </nav>
  );
}

export default Header;
