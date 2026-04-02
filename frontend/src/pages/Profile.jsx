import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Profile.css";

const buildFormData = (user) => ({
  name: user?.name || "",
  email: user?.email || "",
  phone: user?.phone || "",
  street: user?.address?.street || "",
  city: user?.address?.city || "",
  state: user?.address?.state || "",
  pincode: user?.address?.pincode || "",
});

const Profile = ({ user, updateUser }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => buildFormData(user));
  const [savedData, setSavedData] = useState(() => buildFormData(user));

  // If user prop changes (e.g. after KYC upload updates App state),
  // re-sync the form
  useEffect(() => {
    const built = buildFormData(user);
    setFormData(built);
    setSavedData(built);
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const payload = Object.fromEntries(
      Object.entries(formData).filter(
        ([key, val]) => val.trim() !== (savedData[key] || "").trim(),
      ),
    );

    if (Object.keys(payload).length === 0) {
      alert("No changes to save");
      return;
    }

    try {
      const res = await API.patch("/users/profile", payload);
      updateUser(res.data.user); // ← updates App state + localStorage
      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Update failed");
    }
  };

  const getKycStatus = () => {
    if (user?.kycVerified)
      return { label: "KYC STATUS: VERIFIED ✓", clickable: false };
    if (user?.kycDocument)
      return { label: "KYC STATUS: PENDING ⏳", clickable: true };
    return { label: "KYC STATUS: NOT UPLOADED", clickable: true };
  };

  const kyc = getKycStatus();

  return (
    <div className="profile-container">
      {kyc.clickable ? (
        <button
          className="kyc-badge kyc-badge--action"
          onClick={() => navigate("/upload-kyc")}
        >
          {kyc.label}
        </button>
      ) : (
        <div className="kyc-badge kyc-badge--verified">{kyc.label}</div>
      )}

      <form className="profile-form" onSubmit={handleUpdate}>
        <h2>My Profile</h2>
        {[
          { label: "Name", name: "name" },
          { label: "Email", name: "email" },
          { label: "Phone", name: "phone" },
          { label: "Street", name: "street" },
          { label: "City", name: "city" },
          { label: "State", name: "state" },
          { label: "Pincode", name: "pincode" },
        ].map(({ label, name }) => (
          <React.Fragment key={name}>
            <label>{label}</label>
            <input
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={label}
            />
          </React.Fragment>
        ))}
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
