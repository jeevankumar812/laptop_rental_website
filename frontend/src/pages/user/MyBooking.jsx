import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import "./MyBooking.css";
import ReviewModal from "./ReviewModal";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [existingReview, setExistingReview] = useState(null);

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
    const diff = new Date(to).getTime() - new Date(from).getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const handleOpen = async (booking) => {
    setSelectedBooking(booking);

    try {
      const rentalId = booking.rentalId?._id || booking.rentalId;

      console.log("RentalId:", rentalId);

      // ✅ FIXED API
      const res = await API.get(`/reviews/rental/${rentalId}`);

      console.log("Review Response:", res.data);

      if (res.data) {
        setExistingReview(res.data);
        setRating(res.data.rating);
        setComment(res.data.comment);
      } else {
        setExistingReview(null);
        setRating(0);
        setComment("");
      }
    } catch (err) {
      console.error(err);
      setExistingReview(null);
      setRating(0);
      setComment("");
    }
  };

  // ✅ SUBMIT (CREATE / UPDATE)  🔥 FIXED HERE
  const handleSubmit = async () => {
    try {
      const rentalId =
        selectedBooking.rentalId?._id || selectedBooking.rentalId;

      const laptopId =
        selectedBooking.rentalId?.laptopId?._id ||
        selectedBooking.rentalId?.laptopId;

      if (existingReview) {
        await API.put(`/reviews/${existingReview._id}`, {
          rating,
          comment,
        });
      } else {
        await API.post("/reviews", {
          laptopId,
          rentalId,
          rating,
          comment,
        });
      }

      alert("Review saved!");
      setSelectedBooking(null);
    } catch (err) {
      console.error(err);
      alert("Error saving review");
    }
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

            return (
              <div
                className="booking-card clickable"
                key={booking._id}
                onClick={() => handleOpen(booking)}
              >
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
                    {laptop ? `${laptop.brand} ${laptop.model}` : "Laptop"}
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
                      <h4>₹{booking.amount?.toLocaleString()}</h4>
                    </div>

                    <span
                      className={`status ${
                        booking.status === "success" ? "paid" : "pending"
                      }`}
                    >
                      {booking.status === "success" ? "Paid" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ✅ REVIEW MODAL */}
      <ReviewModal
        selectedBooking={selectedBooking}
        rating={rating}
        setRating={setRating}
        comment={comment}
        setComment={setComment}
        existingReview={existingReview}
        onClose={() => setSelectedBooking(null)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default MyBooking;
