import React, { useState } from "react";
import API from "../../api/axios.js";
import "./KYCModal.css";

const KYCModal = ({ isOpen, onClose, onSuccess }) => {
  const [kycFile, setKycFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage("File size must be less than 5MB");
      return;
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      setMessage("Only JPG, PNG, and PDF files are allowed");
      return;
    }

    setKycFile(file);
    setMessage("");

    // Create preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!kycFile) {
      setMessage("Please select a document to upload");
      return;
    }

    const formData = new FormData();
    formData.append("document", kycFile);

    setUploading(true);
    setMessage("");

    try {
      const response = await API.post("/users/upload-kyc", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(
        "✅ KYC document uploaded successfully! Awaiting admin verification.",
      );

      // Clear form after successful upload
      setTimeout(() => {
        setKycFile(null);
        setPreview(null);
        if (onSuccess) onSuccess(response.data);
        if (onClose) setTimeout(() => onClose(), 1500);
      }, 1500);
    } catch (err) {
      console.error("KYC Upload Error:", err);
      setMessage(err.response?.data?.error || "Failed to upload KYC document");
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setKycFile(null);
    setPreview(null);
    setMessage("");
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="kyc-modal-overlay" onClick={handleClose}>
      <div className="kyc-modal" onClick={(e) => e.stopPropagation()}>
        <div className="kyc-modal-header">
          <h3>⚠️ KYC Verification Required</h3>
          <button className="close-btn" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="kyc-modal-body">
          <div className="kyc-info">
            <p>
              You need to complete KYC verification before renting a laptop.
            </p>
            <p>Please upload any one of the following documents:</p>
            <ul>
              <li>📄 Aadhaar Card</li>
              <li>📄 PAN Card</li>
              <li>📄 Voter ID</li>
              <li>📄 Driving License</li>
            </ul>
            <p className="note">
              ⚠️ File size limit: 5MB (Allowed: JPG, PNG, PDF)
            </p>
          </div>

          <div className="upload-area">
            <label className="upload-label">
              <input
                type="file"
                onChange={handleFileSelect}
                accept=".jpg,.jpeg,.png,.pdf"
                style={{ display: "none" }}
              />
              <div className="upload-icon">📁</div>
              <div>{kycFile ? kycFile.name : "Click to select document"}</div>
            </label>

            {/* Preview for images */}
            {preview && (
              <div className="preview-container">
                <img src={preview} alt="Preview" className="preview-image" />
              </div>
            )}

            {message && (
              <div
                className={`upload-message ${message.includes("✅") ? "success" : "error"}`}
              >
                {message}
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={uploading || !kycFile}
              className="upload-btn"
            >
              {uploading ? "Uploading..." : "Upload Document"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCModal;
