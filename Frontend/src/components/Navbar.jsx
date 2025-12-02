import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/services?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <div className="logo">Local Service Finder</div>
        </Link>

        <form onSubmit={handleSearch} className="search">
          <input
            placeholder="Search services, e.g. plumber"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="btn" type="submit">Search</button>
        </form>
      </div>

      <div className="nav-right">
        <Link to="/services" className="btn">Services</Link>
        <Link to="/about" className="btn">About</Link>

        {user ? (
          <>
            <span className="small" style={{ color: "white" }}>
              Hi, {user.name}
            </span>
            <button className="btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="btn secondary">Login / Signup</Link>
        )}
      </div>
    </header>
  );
}
