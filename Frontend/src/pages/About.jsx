import React from "react";
import { motion } from "framer-motion";
import { FaTools, FaUsers, FaMapMarkedAlt, FaStar, FaHandshake } from "react-icons/fa";

const About = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white py-20 px-6 sm:px-16">
      {/* Floating Background Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      {/* Intro Section */}
      <motion.div
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-6">
          About Local Service Finder
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Welcome to <strong>Local Service Finder</strong> — a modern platform connecting people
          with **trusted, skilled professionals** nearby. Whether it’s plumbing, electrical work,
          tutoring, or cleaning — we make your life easier with verified experts and instant booking.
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 max-w-5xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        {[
          { icon: <FaUsers />, title: "Happy Users", value: "50K+" },
          { icon: <FaTools />, title: "Services Available", value: "120+" },
          { icon: <FaMapMarkedAlt />, title: "Cities Covered", value: "85+" },
          { icon: <FaHandshake />, title: "Verified Professionals", value: "10K+" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.08 }}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
          >
            <div className="text-indigo-600 text-5xl mb-3">{stat.icon}</div>
            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            <p className="text-gray-600 mt-1">{stat.title}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mt-20 max-w-6xl mx-auto">
        {[
          {
            icon: <FaTools className="text-indigo-600 text-4xl mb-3" />,
            title: "All-in-One Service Hub",
            desc: "Find every service you need — electricians, tutors, repairmen, cleaners, and many more.",
          },
          {
            icon: <FaUsers className="text-green-600 text-4xl mb-3" />,
            title: "Verified & Rated Experts",
            desc: "We onboard only verified service providers, ensuring safe, reliable, and quality service.",
          },
          {
            icon: <FaMapMarkedAlt className="text-pink-600 text-4xl mb-3" />,
            title: "Smart Local Search",
            desc: "Instantly discover professionals near you with AI-powered location-based results.",
          },
          {
            icon: <FaStar className="text-yellow-500 text-4xl mb-3" />,
            title: "Reviews & Trust",
            desc: "Read honest feedback and ratings before hiring — transparency you can rely on.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl text-center transition-all"
          >
            {item.icon}
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Mission Section */}
      <motion.div
        className="max-w-5xl mx-auto mt-24 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          We aim to **empower local communities** by bridging the gap between people who need services
          and those who offer them. We believe in trust, accessibility, and simplicity — allowing
          everyone to find skilled help with confidence and convenience.
        </p>
      </motion.div>

      {/* Our Story Section */}
      <motion.div
        className="max-w-5xl mx-auto mt-20 bg-indigo-50 p-10 rounded-3xl shadow-inner"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <h2 className="text-3xl font-semibold text-indigo-700 mb-4 text-center">
          Our Story
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Local Service Finder started with a vision — to make everyday help **fast, transparent, and accessible**.  
          What began as a small college project soon turned into a trusted platform used by thousands.
          Today, we continue to innovate by integrating live chat, smart filters, and real-time booking
          updates to make service access as simple as ordering a coffee.
        </p>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="text-center mt-20"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <h2 className="text-3xl font-bold text-indigo-800 mb-4">
          Be Part of the Change
        </h2>
        <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
          Join our growing community of professionals and users making everyday life simpler.
          Whether you’re searching for help or offering your skills — we welcome you!
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-full font-medium shadow-md hover:shadow-lg transition-all">
          Join Local Service Finder
        </button>
      </motion.div>
    </div>
  );
};

export default About;
