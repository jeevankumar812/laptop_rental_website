import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./UploadKYC.css";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const UploadKYC = ({ updateUser }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: "success"|"error", text: "" }

  const inputRef = useRef(null);
  const navigate = useNavigate();

  const ALLOWED = /\.(jpeg|jpg|png|pdf)$/i;
  const ALLOWED_MIME = ["image/jpeg", "image/png", "application/pdf"];

  const validateAndSet = (f) => {
    setMessage(null);
    if (!f) return;

    if (!ALLOWED.test(f.name) || !ALLOWED_MIME.includes(f.type)) {
      setMessage({
        type: "error",
        text: "FORMAT NOT SUPPORTED — JPG, PNG OR PDF ONLY.",
      });
      return;
    }
    if (f.size > MAX_SIZE) {
      setMessage({ type: "error", text: "FILE TOO LARGE — MAX 5MB ALLOWED." });
      return;
    }

    setFile(f);

    if (f.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    validateAndSet(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleInputChange = (e) => {
    validateAndSet(e.target.files[0]);
    e.target.value = "";
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    setMessage(null);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("document", file);

    try {
      const res = await API.post("/users/upload-kyc", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      updateUser(res.data.user);

      const stored = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...stored, ...res.data.user }),
      );

      setMessage({
        type: "success",
        text: "DOCUMENT UPLOADED. AWAITING ADMIN VERIFICATION.",
      });
      setFile(null);
      setPreview(null);
    } catch (error) {
      const errMsg = error.response?.data?.error || "Upload failed. Try again.";
      setMessage({ type: "error", text: errMsg.toUpperCase() });
    } finally {
      setLoading(false);
    }
  };

  const dropzoneClass = [
    "kyc-dropzone",
    file ? "kyc-dropzone--has-file" : "",
    isDragging ? "kyc-dropzone--dragging" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="kyc-container">
      {/* Header */}
      <div className="kyc-header">
        <span className="kyc-tag">IDENTITY VERIFICATION</span>
        <h1 className="kyc-title">KYC UPLOAD</h1>
        <p className="kyc-sub">
          Upload a government-issued ID (Aadhaar or PAN card).
          <br />
          Accepted formats: JPG, PNG, PDF · Max size: 5MB
        </p>
      </div>

      {/* Drop Zone */}
      <div
        className={dropzoneClass}
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          className="kyc-input-hidden"
          onChange={handleInputChange}
        />

        {!file && (
          <div className="kyc-placeholder">
            <span className="kyc-placeholder-icon">↑</span>
            <p className="kyc-placeholder-text">
              DRAG & DROP OR{" "}
              <span className="kyc-placeholder-accent">CLICK TO BROWSE</span>
            </p>
            <p className="kyc-placeholder-text">
              AADHAAR · PAN · JPG · PNG · PDF
            </p>
          </div>
        )}

        {file && preview && (
          <img
            src={preview}
            alt="Document preview"
            className="kyc-preview-img"
          />
        )}

        {file && !preview && (
          <div className="kyc-file-info">
            <span className="kyc-file-icon">PDF</span>
            <span className="kyc-file-name">{file.name}</span>
            <span className="kyc-file-size">{formatBytes(file.size)}</span>
          </div>
        )}
      </div>

      {/* Actions Row */}
      <div className="kyc-actions">
        <span className="kyc-selected-name">
          {file ? file.name : "NO FILE SELECTED"}
        </span>
        <div className="kyc-btn-group">
          {file && (
            <button
              className="kyc-btn kyc-btn--ghost"
              onClick={handleClear}
              disabled={loading}
            >
              CLEAR
            </button>
          )}
          <button
            className={`kyc-btn kyc-btn--primary ${loading ? "kyc-btn--loading" : ""}`}
            onClick={handleSubmit}
            disabled={!file || loading}
          >
            {loading ? "UPLOADING..." : "SUBMIT"}
          </button>
        </div>
      </div>

      {/* Status Message */}
      {message && (
        <div className={`kyc-message kyc-message--${message.type}`}>
          <span className="kyc-message-icon">
            {message.type === "success" ? "✓" : "✗"}
          </span>
          {message.text}
        </div>
      )}

      {/* Back to profile after success */}
      {message?.type === "success" && (
        <button
          className="kyc-btn kyc-btn--ghost kyc-reupload"
          onClick={() => navigate("/profile")}
        >
          ← BACK TO PROFILE
        </button>
      )}
    </div>
  );
};

export default UploadKYC;
