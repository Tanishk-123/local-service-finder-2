import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaRegStar, FaUserCircle } from "react-icons/fa";
import { useData } from "../contexts/DataContext";
import { useAuth } from "../contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";

export default function Reviews() {
  const { services, addReviewToService } = useData();
  const { user } = useAuth();
  const [selected, setSelected] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!user) return alert("Please login to submit a review.");
    if (!selected) return alert("Choose a service to review.");
    const review = {
      id: uuidv4(),
      name: user.name,
      text,
      rating: Number(rating),
    };
    addReviewToService(selected, review);
    setText("");
    setRating(5);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  const allReviews = services.flatMap((s) =>
    (s.reviews || []).map((r) => ({ ...r, serviceTitle: s.title }))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-10 px-6 sm:px-12">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl font-bold text-indigo-700 mb-2">
          Feedback & Reviews
        </h1>
        <p className="text-gray-600">
          Share your experience and help others choose the right service.
        </p>
      </motion.div>

      {/* Review Form */}
      <motion.div
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold text-center text-indigo-700 mb-6">
          Write a Review
        </h2>

        <form onSubmit={submit} className="space-y-6">
          {/* Service Selector */}
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            required
            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400 outline-none"
          >
            <option value="">Choose a Service</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title} — {s.location}
              </option>
            ))}
          </select>

          {/* Rating Stars */}
          <div className="flex items-center gap-2">
            <label className="text-gray-600 font-medium">Rating:</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) =>
                star <= (hoverRating || rating) ? (
                  <FaStar
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="text-yellow-400 text-2xl cursor-pointer transition-transform hover:scale-110"
                  />
                ) : (
                  <FaRegStar
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="text-gray-400 text-2xl cursor-pointer transition-transform hover:scale-110"
                  />
                )
              )}
            </div>
          </div>

          {/* Feedback Textarea */}
          <textarea
            placeholder="Write your feedback..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            className="border border-gray-300 p-3 rounded-lg h-32 focus:ring-2 focus:ring-indigo-400 outline-none w-full resize-none"
          ></textarea>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg shadow-md transition"
          >
            Submit Review
          </motion.button>

          {submitted && (
            <motion.div
              className="mt-4 bg-green-100 border border-green-300 text-green-700 py-3 rounded-lg text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              ✅ Thanks for your review!
            </motion.div>
          )}
        </form>
      </motion.div>

      {/* Review List */}
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <h3 className="text-2xl font-semibold text-indigo-700 mb-6 text-center">
          Recent Reviews
        </h3>

        {allReviews.length ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allReviews.map((r) => (
              <motion.div
                key={r.id}
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-2 gap-2">
                  <FaUserCircle className="text-indigo-500 text-2xl" />
                  <strong className="text-gray-800">{r.name}</strong>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(r.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                  {[...Array(5 - r.rating)].map((_, i) => (
                    <FaRegStar key={i} className="text-gray-300" />
                  ))}
                </div>
                <p className="text-gray-700 mb-2">{r.text}</p>
                <div className="text-sm text-gray-500 italic">
                  — {r.serviceTitle}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 italic mt-4">
            No reviews yet — be the first to share your feedback!
          </div>
        )}
      </motion.div>
    </div>
  );
}
