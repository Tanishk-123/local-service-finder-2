import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  async function onSubmit(data) {
    if (!data.email || !data.password) return alert("Enter email & password.");
    try {
      await login({ email: data.email, password: data.password });
      nav("/");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          background: "#fff",
          borderRadius: "20px",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
          width: "100%",
          maxWidth: "420px",
          padding: "2.5rem",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            marginBottom: "1rem",
            color: "#4B0082",
            fontSize: "2rem",
            fontWeight: "700",
          }}
        >
          Login to Local Service Finder
        </h2>

        <p style={{ color: "#555", marginBottom: "2rem" }}>
          Access your account and continue your journey.
        </p>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ marginBottom: "1.2rem" }}>
            <input
              placeholder="Enter your email"
              style={inputStyle}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <div style={{ color: "#c00", marginTop: 6, fontSize: "0.9rem" }}>
                {errors.email.message}
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1.2rem" }}>
            <input
              type="password"
              placeholder="Enter your password"
              style={inputStyle}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
            />
            {errors.password && (
              <div style={{ color: "#c00", marginTop: 6, fontSize: "0.9rem" }}>
                {errors.password.message}
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            disabled={isSubmitting}
            type="submit"
            style={{
              background: "linear-gradient(90deg, #667eea, #764ba2)",
              color: "#fff",
              border: "none",
              padding: "0.8rem 1.5rem",
              fontSize: "1.1rem",
              borderRadius: "30px",
              cursor: "pointer",
              fontWeight: "600",
              width: "100%",
            }}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </motion.button>
        </motion.form>

        <div style={{ marginTop: "1.5rem", color: "#666", fontSize: "0.95rem" }}>
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{ color: "#764ba2", textDecoration: "none", fontWeight: "600" }}
          >
            Create account
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.9rem",
  borderRadius: "10px",
  border: "1px solid #ccc",
  outline: "none",
  fontSize: "1rem",
  transition: "all 0.3s ease",
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
};
