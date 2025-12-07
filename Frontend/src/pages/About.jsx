
// Frontend/src/pages/About.jsx
import "../styles/about.css";
import { motion } from "framer-motion";
import { FaTools, FaUsers, FaMapMarkedAlt, FaStar, FaHandshake } from "react-icons/fa";
import "../styles/about.css"; // import the stylesheet (create this file or import into App.css)

const About = () => {
  const stats = [
    { icon: <FaUsers />, title: "Happy Users", value: "50K+" },
    { icon: <FaTools />, title: "Services Available", value: "120+" },
    { icon: <FaMapMarkedAlt />, title: "Cities Covered", value: "85+" },
    { icon: <FaHandshake />, title: "Verified Professionals", value: "10K+" },
  ];

  const features = [
    {
      icon: <FaTools />,
      title: "All-in-One Service Hub",
      desc: "Find every service you need — electricians, tutors, repairmen, cleaners, and many more."
    },
    {
      icon: <FaUsers />,
      title: "Verified & Rated Experts",
      desc: "We onboard only verified service providers, ensuring safe, reliable, and quality service."
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Smart Local Search",
      desc: "Instantly discover professionals near you with AI-powered location-based results."
    },
    {
      icon: <FaStar />,
      title: "Reviews & Trust",
      desc: "Read honest feedback and ratings before hiring — transparency you can rely on."
    },
  ];

  return (
    <div className="about-page-wrapper">
      {/* Floating Background Circles */}
      <div className="bg-circle circle-left" aria-hidden="true" />
      <div className="bg-circle circle-right" aria-hidden="true" />

      {/* Intro */}
      <motion.div className="about-intro" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="about-title">About Local Service Finder</h1>
        <p className="about-lead">
          Welcome to <strong>Local Service Finder</strong> — a modern platform connecting people with trusted, skilled professionals nearby. Whether it’s plumbing, electrical work, tutoring, or cleaning — we make your life easier with verified experts and instant booking.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div className="about-stats-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }}>
        {stats.map((s, i) => (
          <motion.div className="about-stat-card" key={i} whileHover={{ scale: 1.05 }}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.title}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Features */}
      <div className="about-features-grid">
        {features.map((f, idx) => (
          <motion.div className="about-feature-card" key={idx} whileHover={{ scale: 1.03 }}>
            <div className="feature-icon">{f.icon}</div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Mission */}
      <motion.section className="about-mission" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <h2>Our Mission</h2>
        <p>
          We aim to <strong>empower local communities</strong> by bridging the gap between people who need services and those who offer them. We believe in trust, accessibility, and simplicity — allowing everyone to find skilled help with confidence and convenience.
        </p>
      </motion.section>

      {/* Story */}
      <motion.section className="about-story" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <h2>Our Story</h2>
        <p>
          Local Service Finder started with a vision — to make everyday help <strong>fast, transparent, and accessible</strong>. What began as a small college project soon turned into a trusted platform used by thousands. Today, we continue to innovate by integrating live chat, smart filters, and real-time booking updates to make service access as simple as ordering a coffee.
        </p>
      </motion.section>

      {/* CTA */}
      <motion.div className="about-cta" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1 }}>
        <h3>Be Part of the Change</h3>
        <p>Join our growing community of professionals and users making everyday life simpler.</p>
        <button className="cta-button">Join Local Service Finder</button>
      </motion.div>
    </div>
  );
};

export default About;
