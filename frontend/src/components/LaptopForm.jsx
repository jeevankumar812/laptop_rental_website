import React from "react";
import { useState } from "react";
import API from "../api/axios";
import "./LaptopForm.css";

const LaptopForm = () => {
  const [formData, setFormData] = useState({
    model: "",
    brand: "",
    ram: "",
    storage: "",
    processor: "",
    display: "",
    os: "",
    securityDeposit: "",
    totalUnits: "",
  });
  const [pricing, setPricing] = useState({
    perDay: "",
    perWeek: "",
    perMonth: "",
  });

  const [imageFile, setImageFile] = useState(null);

  // Handle standard inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle nested pricing inputs
  const handlePricingChange = (e) => {
    const { name, value } = e.target;
    setPricing((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // 1. Append general top-level fields
    data.append("model", formData.model);
    data.append("brand", formData.brand);
    data.append("os", formData.os);
    data.append("display", formData.display);
    data.append("securityDeposit", formData.securityDeposit);
    data.append("totalUnits", formData.totalUnits);

    // 2. Group and Stringify the SPECS object (Fixes your 400 error)
    const specs = {
      ram: formData.ram,
      storage: formData.storage,
      processor: formData.processor,
    };
    data.append("specs", JSON.stringify(specs));

    // 3. Stringify the PRICING object
    data.append("pricing", JSON.stringify(pricing));

    // 4. Append the image
    if (imageFile) {
      data.append("image", imageFile);
    }
    try {
      const response = await API.post("/laptops", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Laptop added successfully!");
      console.log(response.data);
    } catch (err) {
      console.error("Submission error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="laptop-form-container">
      <h2>Add New Laptop</h2>
      <form onSubmit={handleSubmit}>
        <div className="section-title">Specifications</div>
        <div className="grid-2">
          <div className="field-group">
            <label>Model Name</label>
            <input
              name="model"
              placeholder="e.g. MacBook Pro"
              value={formData.model}
              onChange={handleChange}
            />
          </div>
          <div className="field-group">
            <label>Brand</label>
            <input
              name="brand"
              placeholder="e.g. Apple"
              value={formData.brand}
              onChange={handleChange}
            />
          </div>
          <div className="field-group">
            <label>RAM</label>
            <input
              name="ram"
              placeholder="16GB"
              value={formData.ram}
              onChange={handleChange}
            />
          </div>
          <div className="field-group">
            <label>Storage</label>
            <input
              name="storage"
              placeholder="512GB SSD"
              value={formData.storage}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="section-title">Inventory & Security</div>
        <div className="grid-2">
          <div className="field-group">
            <label>Security Deposit (₹)</label>
            <input
              name="securityDeposit"
              type="number"
              value={formData.securityDeposit}
              onChange={handleChange}
            />
          </div>
          <div className="field-group">
            <label>Total Units</label>
            <input
              name="totalUnits"
              type="number"
              value={formData.totalUnits}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="section-title">Pricing Details</div>
        <div className="grid-3">
          <div className="field-group">
            <label>Daily Rate</label>
            <input
              name="perDay"
              type="number"
              placeholder="Daily"
              value={pricing.perDay}
              onChange={handlePricingChange}
            />
          </div>
          <div className="field-group">
            <label>Weekly Rate</label>
            <input
              name="perWeek"
              type="number"
              placeholder="Weekly"
              value={pricing.perWeek}
              onChange={handlePricingChange}
            />
          </div>
          <div className="field-group">
            <label>Monthly Rate</label>
            <input
              name="perMonth"
              type="number"
              placeholder="Monthly"
              value={pricing.perMonth}
              onChange={handlePricingChange}
            />
          </div>
        </div>

        <div className="section-title">Product Image</div>
        <div className="image-upload-box">
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <button type="submit" className="publish-btn">
          Publish Laptop
        </button>
      </form>
    </div>
  );
};

export default LaptopForm;
