import React from "react";
import { motion } from "framer-motion";
import { FaWrench, FaBroom, FaBolt, FaTools, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          background: "linear-gradient(135deg, #0078ff, #00bcd4)",
          color: "white",
          padding: "4rem 1rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.8rem", fontWeight: "700" }}>
          Find Trusted Local Services Easily
        </h1>
        <p style={{ fontSize: "1.2rem", margin: "1rem 0" }}>
          From electricians to home cleaners — book verified professionals in minutes!
        </p>
        <Link to="/services">
          <motion.button
            whileHover={{ scale: 1.1 }}
            style={{
              backgroundColor: "#fff",
              color: "#0078ff",
              padding: "0.8rem 2rem",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "1rem",
            }}
          >
            Explore Services
          </motion.button>
        </Link>
      </motion.section>

      {/* Service Highlights */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        style={{ padding: "3rem 1rem", textAlign: "center" }}
      >
        <h2 style={{ fontSize: "2rem", color: "#2b2b52", marginBottom: "2rem" }}>
          Popular Services
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
            padding: "1rem",
          }}
        >
          {[
            {
              icon: <FaBolt size={40} color="#0078ff" />,
              title: "Electricians",
              desc: "Certified professionals for repairs, wiring, and installations.",
            },
            {
              icon: <FaBroom size={40} color="#0078ff" />,
              title: "Home Cleaning",
              desc: "Deep cleaning and maintenance services for your home or office.",
            },
            {
              icon: <FaWrench size={40} color="#0078ff" />,
              title: "Plumbers",
              desc: "Quick help for leaks, fittings, and bathroom repairs.",
            },
            {
              icon: <FaTools size={40} color="#0078ff" />,
              title: "Appliance Repair",
              desc: "Experts to fix your ACs, fridges, and washing machines.",
            },
          ].map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              style={{
                backgroundColor: "#fff",
                borderRadius: "15px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                padding: "2rem 1rem",
                cursor: "pointer",
              }}
            >
              {service.icon}
              <h3 style={{ color: "#333", marginTop: "1rem" }}>{service.title}</h3>
              <p style={{ color: "#666", marginTop: "0.5rem", fontSize: "0.95rem" }}>
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        style={{
          backgroundColor: "#e3f2fd",
          textAlign: "center",
          padding: "3rem 1rem",
          borderTop: "2px solid #0078ff",
        }}
      >
        <h2 style={{ fontSize: "2rem", color: "#2b2b52" }}>
          Need Instant Help?
        </h2>
        <p style={{ fontSize: "1.1rem", color: "#555", margin: "1rem auto", maxWidth: "700px" }}>
          Contact our 24/7 support team or directly reach your nearest available service provider.
        </p>
        <motion.a
          href="tel:+911234567890"
          whileHover={{ scale: 1.1 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "#0078ff",
            color: "#fff",
            padding: "0.8rem 2rem",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "1rem",
            marginTop: "1rem",
          }}
        >
          <FaPhoneAlt /> Call Now
        </motion.a>
      </motion.section>

      {/* Footer-like Info Section */}
      <footer
        style={{
          background: "#2b2b52",
          color: "#fff",
          textAlign: "center",
          padding: "1.5rem",
          marginTop: "2rem",
        }}
      >
        <p>© {new Date().getFullYear()} Local Service Finder. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;