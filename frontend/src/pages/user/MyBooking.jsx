import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import "./MyBooking.css";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get("/payments/my-history");
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    fetchBookings();
  }, []);

  // 📅 Format Date
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // ⏱ Duration
  const getDays = (from, to) => {
    if (!from || !to) return 0;
    const diff =
      new Date(to).getTime() - new Date(from).getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="booking-page">
      <div className="booking-header">
        <h2>My Bookings</h2>
        <p>Track all your rented laptops and history</p>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <p>No bookings found</p>
        </div>
      ) : (
        <div className="booking-grid">
          {bookings.map((booking) => {
            const laptop = booking.rentalId?.laptopId;
            const from = booking.rentalId?.rentedFrom;
            const to = booking.rentalId?.rentedTo;

            const days = getDays(from, to);
            const perDay = laptop?.pricing?.perDay || 0;

            return (
              <div className="booking-card" key={booking._id}>
                {/* IMAGE */}
                <div className="card-image">
                  <img
                    src={`http://localhost:8000/${laptop?.images?.[0]}`}
                    alt="laptop"
                  />
                </div>

                {/* CONTENT */}
                <div className="card-content">
                  <h3>
                    {laptop
                      ? `${laptop.brand} ${laptop.model}`
                      : "Laptop"}
                  </h3>

                  <p className="specs">
                    {laptop?.specs?.processor} • {laptop?.specs?.ram} •{" "}
                    {laptop?.specs?.storage}
                  </p>

                  {/* DATE */}
                  <div className="date-section">
                    <div>
                      <span>Start</span>
                      <p>{formatDate(from)}</p>
                    </div>
                    <div>
                      <span>End</span>
                      <p>{formatDate(to)}</p>
                    </div>
                    <div>
                      <span>Duration</span>
                      <p>{days} days</p>
                    </div>
                  </div>

                  {/* PRICE + STATUS */}
                  <div className="price-status">
                    <div className="price-box">
                     
                      <h4>
                        ₹{booking.amount?.toLocaleString()}
                      </h4>
                    </div>

                    <span
                      className={`status ${
                        booking.status === "success"
                          ? "paid"
                          : "pending"
                      }`}
                    >
                      {booking.status === "success"
                        ? "Paid"
                        : "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBooking;