import React from "react";
import "./MyBooking.css";

const ReviewModal = ({
  selectedBooking,
  rating,
  setRating,
  comment,
  setComment,
  existingReview,
  onClose,
  onSubmit,
}) => {
  if (!selectedBooking) return null;

  return (
    <div className="review-modal">
      <div className="review-box">
        <h3>{existingReview ? "Update Review" : "Write Review"}</h3>

        {/* ⭐ Stars */}
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= rating ? "active" : ""}
              onClick={() => setRating(star)}
            >
              ⭐
            </span>
          ))}
        </div>

        {/* Comment */}
        <textarea
          placeholder="Write your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* Actions */}
        <div className="review-actions">
          <button onClick={onSubmit}>
            {existingReview ? "Update" : "Post"}
          </button>

          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
