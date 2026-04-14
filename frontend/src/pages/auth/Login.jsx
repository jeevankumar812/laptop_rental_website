import React, { useState } from "react";
import API from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUser(res.data.user);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          onChange={handleChange}
          required
        />

        <div className="text-right">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <button type="submit">Login</button>

        {/* 🔥 SWITCH TO SIGNUP */}
        <p>
          Don’t have an account?{" "}
          <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;