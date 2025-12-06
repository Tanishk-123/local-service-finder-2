import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { useData } from "../contexts/DataContext";

export default function Services() {
  const { services } = useData();
  const [query, setQuery] = useState("");

  const filtered = services.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.category.toLowerCase().includes(query.toLowerCase()) ||
      s.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ minHeight: "80vh", padding: "30px 18px" }}>
      {/* Header */}
      <motion.div
        className="center"
        style={{ marginBottom: 30 }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#007bff", marginBottom: 8 }}>Available Services</h1>
        <p className="muted">Choose from trusted professionals near you</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        style={{ maxWidth: 600, margin: "0 auto 30px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="search" style={{ background: "rgba(0, 123, 255, 0.08)", border: "1px solid #e6e9ee" }}>
          <FaSearch style={{ color: "#6b7280" }} />
          <input
            type="text"
            placeholder="Search electrician, plumber, cleaning…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ color: "#111827", width: "100%" }}
          />
        </div>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        className="grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {filtered.length ? (
          filtered.map((s) => (
            <motion.div key={s.id} whileHover={{ scale: 1.03 }} className="card">
              <h3 style={{ marginTop: 0, color: "#111827" }}>{s.title}</h3>
              <div className="flex" style={{ fontSize: "0.9rem", gap: 6 }}>
                <FaMapMarkerAlt style={{ color: "#d32f2f", marginTop: 2 }} />
                <span className="muted">{s.location}</span>
              </div>

              {s.img && (
                <img
                  src={s.img}
                  alt={s.title}
                  style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8, marginTop: 12 }}
                />
              )}

              <p className="muted" style={{ marginTop: 12, fontSize: "0.9rem", maxHeight: 50, overflow: "hidden" }}>
                {s.description}
              </p>
              {/* Rating and Price */}    
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                <div className="flex" style={{ gap: 4 }}>
                  <FaStar style={{ color: "#fbbf24" }} />
                  <span style={{ fontWeight: 600, color: "#111827" }}>{s.rating}</span>
                </div>
                <div style={{ color: "#007bff", fontWeight: 700, fontSize: "1.1rem" }}>₹{s.price}</div>
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                <Link
                  to={`/services/${s.id}`}
                  className="btn secondary"
                  style={{ flex: 1, textAlign: "center", padding: "8px 12px", fontSize: "0.9rem" }}
                >
                  View Details
                </Link>
                <button
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    background: "#10b981",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "0.9rem"
                  }}
                >
                  <Link to={`/booking/${s.id}`} style={{ color: "white", textDecoration: "none" }}>Book Now</Link>
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="center muted" style={{ gridColumn: "1/-1", fontStyle: "italic", marginTop: 20 }}>
            No matching services found…
          </div>
        )}
      </motion.div>
    </div>
  );
}
