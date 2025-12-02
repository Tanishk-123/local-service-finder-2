import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import { useAuth } from "../contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClipboardCheck, FaClock, FaUserCircle } from "react-icons/fa";

export default function Booking() {
  const { id } = useParams();
  const { services, addBooking } = useData();
  const s = services.find((x) => x.id === id);
  const { user } = useAuth();
  const nav = useNavigate();

  const [slot, setSlot] = useState("");
  const [notes, setNotes] = useState("");

  if (!s)
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Service not found 🛠️
      </div>
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    const booking = {
      id: uuidv4(),
      serviceId: s.id,
      user: user,
      slot,
      notes,
      createdAt: new Date().toISOString(),
    };
    addBooking(booking);
    alert("✅ Booking Confirmed Successfully!");
    nav("/services");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-4 sm:px-10">
      <motion.div
        className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b pb-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-blue-700">
              Book — {s.title}
            </h2>
            <p className="text-gray-600 mt-1">Quick and easy online booking</p>
          </div>
          <div className="text-right text-blue-600 font-semibold text-lg mt-4 sm:mt-0">
            ₹{s.price}
          </div>
        </div>

        {/* User Info */}
        {user ? (
          <div className="flex items-center gap-3 mb-6 bg-blue-50 p-4 rounded-lg">
            <FaUserCircle className="text-4xl text-blue-500" />
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        ) : (
          <div className="text-red-500 text-sm mb-4">
            ⚠️ Please login to continue booking.
          </div>
        )}

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              <FaClock className="inline mr-2 text-blue-600" />
              Choose Your Slot
            </label>
            <select
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select a time slot</option>
              <option>Tomorrow 10:00 - 12:00</option>
              <option>Tomorrow 14:00 - 16:00</option>
              <option>2 Days Later 09:00 - 11:00</option>
              <option>2 Days Later 15:00 - 17:00</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              <FaClipboardCheck className="inline mr-2 text-blue-600" />
              Additional Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any specific requests or location details..."
              className="w-full border border-gray-300 p-3 rounded-lg h-24 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium text-lg shadow-md transition"
          >
            Confirm Booking
          </motion.button>
        </form>

        {/* Info Section */}
        <motion.div
          className="mt-10 bg-blue-50 p-6 rounded-xl text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <FaCalendarAlt className="text-blue-500 text-4xl mx-auto mb-2" />
          <h3 className="font-semibold text-blue-700 text-xl mb-2">
            Fast, Secure & Reliable
          </h3>
          <p className="text-gray-600 text-sm">
            Once your booking is confirmed, you’ll receive instant confirmation
            along with provider details via your registered email.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
