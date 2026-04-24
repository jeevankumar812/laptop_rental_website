import { useEffect, useState } from "react";
import API from "../../api/axios";
import "./Rentals.css";

const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/rentals/admin", authHeader())
      .then((res) => setRentals(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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

        {/* ===== HEADER ===== */}
        <div className="rentals-header">
          <h2>Rentals</h2>
          <span className="count">{rentals.length} records</span>
        </div>

        {/* ===== GRID LIST ===== */}
        <div className="rentals-list">
          {rentals.map((r, index) => (
            <div className="rental-card" key={r._id}>

              {/* ===== TOP ===== */}
              <div className="rental-top">
                <h3>
                  {index + 1}. {r.laptopId?.brand} {r.laptopId?.model}
                </h3>
                <span className="amount">
                  ₹{r.pricing?.totalAmount}
                </span>
              </div>

              {/* ===== USER SECTION ===== */}
              <div className="rental-section">
                <p><strong>User:</strong> {r.userId?.name}</p>
                <p><strong>User ID:</strong> {r.userId?._id}</p>
              </div>

              {/* ===== LAPTOP SECTION ===== */}
              <div className="rental-section">
                <p><strong>Laptop ID:</strong> {r.laptopId?._id}</p>
                <p><strong>Brand:</strong> {r.laptopId?.brand}</p>
                <p><strong>Model:</strong> {r.laptopId?.model}</p>
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

export default Rentals;