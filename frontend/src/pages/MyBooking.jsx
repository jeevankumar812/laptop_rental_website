import React, { useState, useEffect } from "react";
import API from "../api/axios";

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
    <div style={{ padding: "20px" }}>
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            style={{
              border: "1px solid #ddd",
              padding: "16px",
              marginBottom: "12px",
              borderRadius: "8px",
            }}
          >
            <img
              src={`http://localhost:8000/${booking.rentalId?.laptopId?.images?.[0]}`}
              alt="laptop"
              style={{
                width: "120px",
                height: "90px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <h3>
              {booking.rentalId?.laptopId
                ? `${booking.rentalId.laptopId.brand} ${booking.rentalId.laptopId.model}`
                : "Laptop"}
            </h3>
            <p>Processor: {booking.rentalId?.laptopId?.specs?.processor} </p>
            <p>Storage: {booking.rentalId?.laptopId?.specs?.storage}</p>
            <p>RAM: {booking.rentalId?.laptopId?.specs?.ram}</p>
            <p>OS: {booking.rentalId?.laptopId?.specs?.os}</p>
            <p>
              Rental: {formatDate(booking.rentalId?.rentedFrom)} →
              {formatDate(booking.rentalId?.rentedTo)}
            </p>

            <p>
              Amount: ₹{booking.amount ? booking.amount.toLocaleString() : "-"}
            </p>

            <p>
              Status:{" "}
              {booking.status === "success" ? "Paid" : booking.status || "-"}
            </p>
          </div>
        ))
      )}
    </div>
  );
};
export default MyBooking;
