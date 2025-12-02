import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-6 sm:px-16">
      <motion.div
        className="max-w-5xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Contact Us</h1>
        <p className="text-gray-600 text-lg mb-10">
          We’d love to hear from you! Whether you have a question, feedback, or need help,
          our support team is ready to assist.
        </p>
      </motion.div>

      {/* Contact Info Section */}
      <motion.div
        className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {[
          {
            icon: <FaEnvelope className="text-blue-600 text-3xl mb-2" />,
            title: "Email Us",
            info: "support@localfinder.com",
          },
          {
            icon: <FaPhoneAlt className="text-green-600 text-3xl mb-2" />,
            title: "Call Us",
            info: "+91 98765 43210",
          },
          {
            icon: <FaMapMarkerAlt className="text-red-500 text-3xl mb-2" />,
            title: "Visit Us",
            info: "123 City Center, Mumbai, India",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all"
          >
            {item.icon}
            <h3 className="font-semibold text-lg text-gray-800 mb-1">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.info}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Contact Form */}
      <motion.div
        className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
          Send Us a Message
        </h2>

        <form onSubmit={submit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handle}
              required
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handle}
              required
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
            />
          </div>

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handle}
            required
            className="border border-gray-300 p-3 rounded-lg h-32 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none w-full"
          ></textarea>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium text-lg shadow-md flex items-center justify-center gap-2 transition"
          >
            <FaPaperPlane /> Send Message
          </motion.button>
        </form>

        {sent && (
          <motion.div
            className="mt-6 bg-green-100 border border-green-300 text-green-700 p-4 rounded-lg text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            ✅ Thanks for reaching out! We’ll get back to you soon.
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
