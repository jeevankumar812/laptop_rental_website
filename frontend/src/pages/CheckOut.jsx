import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./CheckOut.css";
import API from "../api/axios";

const Checkout = () => {
  const baseURL = "http://localhost:8000/";
  const location = useLocation();
  const { laptop } = location.state || {};

  const [rentedFrom, setRentedFrom] = useState("");
  const [rentedTo, setRentedTo] = useState("");
  const [deliveryType, setDeliveryType] = useState("pickup");
  const [address, setAddress] = useState("");

  if (!laptop) {
    return <div>No laptop selected.</div>;
  }

  const days =
    rentedFrom && rentedTo
      ? Math.max(
          Math.ceil(
            (new Date(rentedTo) - new Date(rentedFrom)) / (1000 * 60 * 60 * 24),
          ),
          0,
        )
      : 0;

  const baseAmount = days * laptop.pricing?.perDay;
  const totalAmount = baseAmount + laptop.securityDeposit;

  const createRental = async () => {
    const res = await API.post("/rentals", {
      laptopId: laptop._id,
      rentedFrom,
      rentedTo,
      deliveryType,
      deliveryAddress: address,
    });

    return res.data._id;
  };

  const createOrder = async (rentalId) => {
    const res = await API.post("/payments/create-order", {
      rentalId,
    });

    return res.data;
  };
  const verifyPayment = async (paymentData, rentalId) => {
    await API.post("/payments/verify", {
      ...paymentData,
      rentalId,
    });

    window.location.href = `/rental-success/${rentalId}`;
  };
  const handlePayment = async () => {
    try {
      const rentalId = await createRental();

      const order = await createOrder(rentalId);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        name: "Laptop Rental",
        description: laptop.model,

        handler: async function (response) {
          await verifyPayment(response, rentalId);
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {/* Laptop Summary */}
      <div className="summary">
        <img src={`${baseURL}${laptop.images?.[0]}`} alt={laptop.model} />
        <h3>{laptop.model}</h3>
        <p>₹{laptop.pricing?.perDay} / day</p>
        <p>Security Deposit: ₹{laptop.securityDeposit}</p>
        <p>{laptop.availableUnits} units available</p>
      </div>

      {/* Rental Details */}
      <div className="rental-details">
        <h2>Rental Details</h2>

        <label>Start Date</label>
        <input
          type="date"
          value={rentedFrom}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setRentedFrom(e.target.value)}
        />

        <label>End Date</label>
        <input
          type="date"
          value={rentedTo}
          min={rentedFrom}
          onChange={(e) => setRentedTo(e.target.value)}
        />

        <label>Delivery Type</label>
        <select
          value={deliveryType}
          onChange={(e) => setDeliveryType(e.target.value)}
        >
          <option value="pickup">Pickup</option>
          <option value="delivery">Delivery</option>
        </select>

        {deliveryType === "delivery" && (
          <textarea
            placeholder="Enter delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        )}
      </div>

      {/* Price Breakdown */}
      <div className="price">
        <h2>Price Details</h2>
        <p>Days: {days}</p>
        <p>
          ₹{laptop.pricing?.perDay} × {days} days = ₹{baseAmount}
        </p>
        <p>Security Deposit: ₹{laptop.securityDeposit}</p>
        <h3>Total: ₹{totalAmount}</h3>
      </div>

      <button
        className="pay-btn"
        onClick={handlePayment}
        disabled={!rentedFrom || !rentedTo || days <= 0}
      >
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;
