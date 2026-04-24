import { useEffect, useState } from "react";
import API from "../../api/axios";
import "./Laptops.css";

const Laptops = () => {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:8000";

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const res = await API.get("/laptops");
        setLaptops(res.data || []);
      } catch (err) {
        console.error("Error fetching laptops:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLaptops();
  }, []);

  const deleteLaptop = async (id) => {
    try {
      await API.delete(`/laptops/${id}`);
      setLaptops((prev) => prev.filter((l) => l._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (loading) {
    return (
      <div className="admin-laptops-page">
        <div className="laptops-loading">Loading laptops...</div>
      </div>
    );
  }

  return (
    <div className="admin-laptops-page">
      <div className="laptops-container">
        {laptops.map((lap) => (
          <div className="laptop-card" key={lap._id}>
            
            {/* Image */}
            <div className="laptop-image">
              <img
                src={
                  lap.images?.[0]
                    ? `${BASE_URL}/${lap.images[0]}`
                    : "/no-image.png"
                }
                alt={lap.model}
              />
            </div>

            {/* Content */}
            <div className="laptop-content">

              {/* Header */}
              <div className="laptop-header">
                <h3>{lap.model}</h3>
                <span className="brand">{lap.brand}</span>
              </div>

              {/* Specs */}
              <div className="laptop-specs">
                <span>{lap.specs?.processor}</span>
                <span>{lap.specs?.ram}</span>
                <span>{lap.specs?.storage}</span>
              </div>

              {/* Footer */}
              <div className="laptop-footer">
                <div className="price">₹{lap.pricing?.perDay}</div>

                <button
                  className="delete-btn"
                  onClick={() => deleteLaptop(lap._id)}
                >
                  Delete
                </button>
              </div>

              {/* Meta */}
              <div className="laptop-meta">
                <span>Status: {lap.status}</span>
                <span>Available: {lap.availableUnits}</span>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Laptops;