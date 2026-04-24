import { useEffect, useState } from "react";
import API from "../../api/axios";
import "./Reviews.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/reviews/all", authHeader())
      .then((res) => setReviews(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const deleteReview = async (id) => {
    try {
      await API.delete(`/reviews/${id}`, authHeader());
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (loading) {
    return (
      <div className="admin-reviews-page">
        <div className="reviews-loading">Loading reviews...</div>
      </div>
    );
  }

  return (
    <div className="admin-reviews-page">
      <div className="reviews-container">

        {/* HEADER */}
        <div className="reviews-header">
          <h2>Reviews</h2>
          <span className="count">{reviews.length} records</span>
        </div>

        {/* LIST (DOWNWARD) */}
        <div className="reviews-list">
          {reviews.map((r, index) => (
            <div className="review-card" key={r._id}>

              {/* TOP */}
              <div className="review-top">
                <h3>
                  {index + 1}. {r.laptopId?.brand} {r.laptopId?.model}
                </h3>
                <span className="rating">⭐ {r.rating}/5</span>
              </div>

              {/* USER */}
              <div className="review-section">
                <p><strong>User:</strong> {r.userId?.name}</p>
              </div>

              {/* COMMENT */}
              <div className="review-section">
                <p><strong>Comment:</strong></p>
                <p className="comment">{r.comment}</p>
              </div>

              {/* ACTION */}
              <div className="review-actions">
                <button
                  className="delete-btn"
                  onClick={() => deleteReview(r._id)}
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default Reviews;