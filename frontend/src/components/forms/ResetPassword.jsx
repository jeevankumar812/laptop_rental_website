import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import API from "../../api/axios";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const resetToken = queryParams.get("token");

    if (!resetToken) {
      setError("Invalid reset link. Please request a new password reset.");
    } else {
      setToken(resetToken);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await API.post("/users/reset-password", {
        token,
        newPassword,
      });

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="resetPage-container">
      <div className="resetPage-form">
        <h2>Reset Password</h2>

        <p className="resetPage-description">
          Please enter your new password below.
        </p>

        {message && (
          <div className="resetPage-success">
            {message}
            <div className="mt-2">Redirecting to login...</div>
          </div>
        )}

        {error && (
          <div className="resetPage-error">
            {error}
            <div className="mt-2">
              <Link to="/forgot-password">Request new reset link</Link>
            </div>
          </div>
        )}

        {!message && (
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="New Password (min 6 chars)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isLoading}
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              required
            />

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>

            <div className="resetPage-footer">
              <Link to="/login">Back to Login</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;