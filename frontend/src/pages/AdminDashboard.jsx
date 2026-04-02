import React, { useState } from "react";
import LaptopForm from "../components/LaptopForm";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("laptop-form");

  const menuItems = [
    { id: "laptop-form", label: "Laptop Form", icon: "💻" },
    { id: "kyc-requests", label: "KYC Requests", icon: "🆔" },
    { id: "payment-history", label: "Payment History", icon: "💰" },
    { id: "rental-history", label: "Rental History", icon: "📅" },
  ];

  return (
    <div className="admin-container">
      {/* Sidebar Navigation */}
      <nav className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={activeTab === item.id ? "active" : ""}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content Area */}
      <main className="admin-content">
        <header className="content-header">
          <h1>{menuItems.find((i) => i.id === activeTab)?.label}</h1>
        </header>

        <div className="content-body">
          {activeTab === "laptop-form" && <LaptopForm />}
          {activeTab === "kyc-requests" && (
            <div>KYC Request Table Coming Soon...</div>
          )}
          {activeTab === "payment-history" && (
            <div>Payment History Table Coming Soon...</div>
          )}
          {activeTab === "rental-history" && (
            <div>Rental History Table Coming Soon...</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
