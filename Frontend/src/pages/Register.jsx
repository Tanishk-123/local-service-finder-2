import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";

export default function Register() {
  const { signup } = useAuth();
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  async function onSubmit(data) {
    try {
      await signup({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role
      });
      alert("Account created!");
      nav("/");
    } catch (err) {
      alert(err.message || "Failed to create account");
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
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
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
          Create Account
        </h2>

        <p style={{ color: "#555", marginBottom: "2rem" }}>
          Join our community of trusted professionals and customers.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: "1.2rem" }}>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", { required: "Full name is required" })}
              style={inputStyle}
            />
            {errors.name && (
              <div style={{ color: "#c00", fontSize: "0.9rem" }}>
                {errors.name.message}
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1.2rem" }}>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "Invalid email",
                },
              })}
              style={inputStyle}
            />
            {errors.email && (
              <div style={{ color: "#c00", fontSize: "0.9rem" }}>
                {errors.email.message}
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1.2rem" }}>
            <input
              type="password"
              placeholder="Password here"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              style={inputStyle}
            />
            {errors.password && (
              <div style={{ color: "#c00", fontSize: "0.9rem" }}>
                {errors.password.message}
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1.2rem" }}>
            <select 
              {...register("role", { required: "Please select a role" })} 
              style={inputStyle}
              defaultValue=""
            >
              <option value="" disabled>
              Customer / Service Provider
              </option>
              <option value="customer">Customer</option>
            <option value="service_provider">Service Provider</option>
          </select>
           {errors.role && (
            <div style={{ color: "#c00", fontSize: "0.9rem" }}>
            {errors.role.message}
            </div>
            )}
        </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
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
              marginTop: "10px",
            }}
          >
            {isSubmitting ? "Creating..." : "Register"}
          </motion.button>
        </form>
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
};