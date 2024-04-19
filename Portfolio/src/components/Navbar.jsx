import React from "react";
import "./nav.css";
export const Navbar = () => {
  return (
    <div>
      <nav>
        <div className="logo">
          <a href="#">Code by Amanuel</a>
        </div>

        <ul className="menu">
          <li>
            <a href="#main">Home</a>
          </li>

          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
