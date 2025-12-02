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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-6 sm:px-14">

      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-blue-700 mb-2">Available Services</h1>
        <p className="text-gray-600">Choose from trusted professionals near you</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        className="max-w-3xl mx-auto mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="flex items-center bg-white shadow-md p-3 rounded-full border">
          <FaSearch className="text-gray-500 text-lg ml-3" />
          <input
            type="text"
            placeholder="Search electrician, plumber, cleaning…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2 outline-none rounded-full"
          />
        </div>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {filtered.length ? (
          filtered.map((s) => (
            <motion.div
              key={s.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border"
            >
              {/* Service Title */}
              <h2 className="text-xl font-semibold text-gray-800">{s.title}</h2>
              <div className="flex items-center gap-2 mt-1 text-gray-500 text-sm">
                <FaMapMarkerAlt className="text-red-500" />
                {s.location}
              </div>

              {/* Image */}
              {s.img && (
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-40 object-cover rounded-xl mt-4"
                />
              )}

              {/* Description */}
              <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                {s.description}
              </p>

              {/* Rating + Price */}
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-1 text-yellow-400">
                  <FaStar />
                  <span className="text-gray-700 font-medium">{s.rating}</span>
                </div>
                <div className="text-blue-700 font-semibold text-lg">₹{s.price}</div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex justify-between">
                <Link
                  to={`/services/${s.id}`}
                  className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                  View Details
                </Link>
                <Link
                  to={`/booking/${s.id}`}
                  className="text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Book Now
                </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center col-span-full text-gray-500 italic">
            No matching services found…
          </div>
        )}
      </motion.div>
    </div>
  );
}
