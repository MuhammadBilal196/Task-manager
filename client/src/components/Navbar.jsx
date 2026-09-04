import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">✓</span>
        <span>Task Manager</span>
      </div>
      <div className="navbar-links">
        <NavLink to="/" end className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/tasks" className={linkClass}>
          Tasks
        </NavLink>
        <NavLink to="/tasks/new" className={linkClass}>
          + Add Task
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
