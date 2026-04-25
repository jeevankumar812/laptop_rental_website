import React, { useState } from "react";
import API from "../../api/axios";
import "./LaptopForm.css";

const LaptopForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    model: "",
    brand: "",
    ram: "",
    storage: "",
    processor: "",
    gpu: "",
    display: "",
    os: "",
    securityDeposit: "",
    totalUnits: "",
    availableUnits: "",
    category: "Office",
    condition: "good",
    status: "available",
    tags: "",
  });

  const [pricing, setPricing] = useState({
    perDay: "",
    perWeek: "",
    perMonth: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePricingChange = (e) => {
    const { name, value } = e.target;
    setPricing((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("model", formData.model);
    data.append("brand", formData.brand);
    data.append("category", formData.category);
    data.append("condition", formData.condition);
    data.append("status", formData.status);
    data.append("securityDeposit", formData.securityDeposit);
    data.append("totalUnits", formData.totalUnits);
    data.append(
      "availableUnits",
      formData.availableUnits || formData.totalUnits
    );

    const tagsArray = formData.tags.split(",").map((tag) => tag.trim());
    data.append("tags", JSON.stringify(tagsArray));

    const specs = {
      ram: formData.ram,
      storage: formData.storage,
      processor: formData.processor,
      gpu: formData.gpu,
      display: formData.display,
      os: formData.os,
    };

    data.append("specs", JSON.stringify(specs));
    data.append("pricing", JSON.stringify(pricing));

    if (imageFile) data.append("image", imageFile);

    try {
      await API.post("/laptops", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Laptop added successfully!");

      onSuccess();   // refresh list
      onClose();     // close modal
    } catch (err) {
      console.error(err);
      alert("❌ Error");
    }
  };

  return (
    <div className="laptopModalOverlay">
      <div className="laptopModalCard">

        <span className="closeBtn" onClick={onClose}>✖</span>

        <div className="laptop-form-container">
          <h2>Add New Laptop</h2>

          <form onSubmit={handleSubmit}>

            {/* BASIC */}
            <div className="section-title">Basic Info</div>
            <div className="grid-2">
              <div className="field-group">
                <label>Model</label>
                <input name="model" onChange={handleChange} />
              </div>

              <div className="field-group">
                <label>Brand</label>
                <input name="brand" onChange={handleChange} />
              </div>
            </div>

            {/* SPECS */}
            <div className="section-title">Specifications</div>
            <div className="grid-3">
              <input name="ram" placeholder="RAM" onChange={handleChange} />
              <input name="storage" placeholder="Storage" onChange={handleChange} />
              <input name="processor" placeholder="Processor" onChange={handleChange} />
              <input name="gpu" placeholder="GPU" onChange={handleChange} />
              <input name="display" placeholder="Display" onChange={handleChange} />
              <input name="os" placeholder="OS" onChange={handleChange} />
            </div>

            {/* CATEGORY */}
            <div className="section-title">Category</div>
            <div className="grid-2">
              <select name="category" onChange={handleChange}>
                <option>Office</option>
                <option>Gaming</option>
                <option>Student</option>
                <option>Workstation</option>
              </select>

              <input name="tags" placeholder="tags" onChange={handleChange} />
            </div>

            {/* CONDITION */}
            <div className="section-title">Condition & Status</div>
            <div className="grid-2">
              <select name="condition" onChange={handleChange}>
                <option>new</option>
                <option>good</option>
                <option>fair</option>
              </select>

              <select name="status" onChange={handleChange}>
                <option>available</option>
                <option>rented</option>
                <option>maintenance</option>
              </select>
            </div>

            {/* INVENTORY */}
            <div className="section-title">Inventory</div>
            <div className="grid-2">
              <input type="number" name="totalUnits" placeholder="Total Units" onChange={handleChange} />
              <input type="number" name="availableUnits" placeholder="Available Units" onChange={handleChange} />
            </div>

            {/* PRICING */}
            <div className="section-title">Pricing</div>
            <div className="grid-3">
              <input type="number" name="perDay" placeholder="Per Day" onChange={handlePricingChange} />
              <input type="number" name="perWeek" placeholder="Per Week" onChange={handlePricingChange} />
              <input type="number" name="perMonth" placeholder="Per Month" onChange={handlePricingChange} />
            </div>

            {/* SECURITY */}
            <div className="section-title">Deposit</div>
            <input type="number" name="securityDeposit" onChange={handleChange} />

            {/* IMAGE */}
            <div className="section-title">Image</div>
            <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />

            <button className="publish-btn"> Publish Laptop</button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default LaptopForm;