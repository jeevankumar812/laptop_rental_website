import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import "./MyBooking.css";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const res = await API.get("/payments/my-history");
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    getBookings();
  }, []);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });

  return (
    <div className="booking-page">
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="empty">No bookings found</p>
      ) : (
        <div className="booking-grid">
          {bookings.map((booking) => {
            const laptop = booking.rentalId?.laptopId;

            return (
              <div className="booking-card" key={booking._id}>
                {/* IMAGE */}
                <img
                  src={`http://localhost:8000/${laptop?.images?.[0]}`}
                  alt="laptop"
                />

                {/* INFO */}
                <div className="booking-info">
                  <h3>
                    {laptop ? `${laptop.brand} ${laptop.model}` : "Laptop"}
                  </h3>

                  <p className="specs">
                    {laptop?.specs?.processor} • {laptop?.specs?.ram} •{" "}
                    {laptop?.specs?.storage}
                  </p>

                  <p className="dates">
                    {formatDate(booking.rentalId?.rentedFrom)} →{" "}
                    {formatDate(booking.rentalId?.rentedTo)}
                  </p>

                  <div className="bottom">
                    <span className="price">
                      ₹{booking.amount?.toLocaleString() || "-"}
                    </span>

                    <span
                      className={`status ${
                        booking.status === "success" ? "paid" : "pending"
                      }`}
                    >
                      {booking.status === "success"
                        ? "Paid"
                        : booking.status || "Pending"}
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
