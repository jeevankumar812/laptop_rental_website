import { useEffect, useState } from "react";
import API from "../../api/axios";
import "./Rentals.css";

const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = () => {
    API.get("/rentals/admin", authHeader())
      .then((res) => setRentals(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  //RETURN FUNCTION
  const handleReturn = async (id) => {
    try {
      const res = await API.put(`/rentals/${id}`, {}, authHeader());

      alert(`Returned successfully!\nFine: ₹${res.data.lateFee}`);

      fetchRentals(); // 🔥 refresh data
    } catch (err) {
      alert(err.response?.data?.error || "Error returning laptop");
    }
  };

  if (loading) {
    return (
      <div className="admin-rentals-page">
        <div className="rentals-loading">Loading rentals...</div>
      </div>
    );
  }

  return (
    <div className="admin-rentals-page">
      <div className="rentals-container">
        {/* HEADER */}
        <div className="rentals-header">
          <h2>Rentals</h2>
          <span className="count">{rentals.length} records</span>
        </div>

        {/* GRID */}
        <div className="rentals-list">
          {rentals.map((r, index) => {
            const isLate =
              r.status === "active" && new Date() > new Date(r.rentedTo);

            return (
              <div className="rental-card" key={r._id}>
                {/* TOP */}
                <div className="rental-top">
                  <h3>
                    {index + 1}. {r.laptopId?.brand} {r.laptopId?.model}
                  </h3>
                  <span className="amount">₹{r.pricing?.totalAmount}</span>
                </div>

                {/* USER */}
                <div className="rental-section">
                  <p>
                    <strong>User:</strong> {r.userId?.name}
                  </p>
                  <p>
                    <strong>User ID:</strong> {r.userId?._id}
                  </p>
                </div>

                {/* LAPTOP */}
                <div className="rental-section">
                  <p>
                    <strong>Brand:</strong> {r.laptopId?.brand}
                  </p>
                  <p>
                    <strong>Model:</strong> {r.laptopId?.model}
                  </p>
                </div>

                {/* DETAILS */}
                <div className="rental-section">
                  <p>
                    <strong>Start:</strong>{" "}
                    {new Date(r.rentedFrom).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>End:</strong>{" "}
                    {new Date(r.rentedTo).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>Fine:</strong>{" "}
                    {r.pricing?.lateFee > 0 ? (
                      <span className="fine">₹{r.pricing.lateFee}</span>
                    ) : (
                      <span className="no-fine">No Fine</span>
                    )}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={`status ${r.status}`}>{r.status}</span>
                    {isLate && <span className="late-badge">Late</span>}
                  </p>
                </div>

                {/*RETURN BUTTON */}
                {r.status === "active" && (
                  <button
                    className="return-btn"
                    onClick={() => handleReturn(r._id)}
                  >
                    Return Laptop
                  </button>
                )}
              </div>
            );
          })}
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

export default Rentals;
