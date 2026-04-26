import React from "react";
import "./ReviewModal.css";

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
    <div className="reviewModalOverlay">
      <div className="reviewModalCard">

        {/* TITLE */}
        <h3>
          {existingReview ? "Update Review" : "Write Review"}
        </h3>

        {/* ⭐ STARS */}
        <div className="reviewStars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`reviewStar ${
                star <= rating ? "active" : ""
              }`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        {/* COMMENT */}
        <textarea
          className="reviewTextarea"
          placeholder="Write your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* ACTION BUTTONS */}
        <div className="reviewActions">
          <button
            className="reviewBtn updateBtn"
            onClick={onSubmit}
          >
            {existingReview ? "Update" : "Post"}
          </button>

          <button
            className="reviewBtn cancelBtn"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;