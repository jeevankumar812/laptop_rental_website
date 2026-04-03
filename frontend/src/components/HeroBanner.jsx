import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./HeroBanner.css";

const HeroBanner = () => {
  const navigate = useNavigate();
  const [laptop, setLaptop] = useState(null);

  const baseURL = "http://localhost:8000/";

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await API.get("/laptops");
        // Pick a random laptop to feature
        const randomLaptop =
          res.data[Math.floor(Math.random() * res.data.length)];
        setLaptop(randomLaptop);
      } catch (error) {
        console.error("Error fetching featured laptop:", error);
      }
    };
    fetchFeatured();
  }, []);

  if (!laptop)
    return <div className="hero-loading">Loading Featured Deal...</div>;

  const handleRentNow = (laptop) => {
    navigate("/checkout", { state: { laptop } });
  };

  return (
    <div className="hero-container">
      <div className="hero-main-card">
        {/* Left Side: Laptop Image */}
        <div className="hero-image-section">
          <div className="image-border-box">
            <img src={`${baseURL}${laptop.images?.[0]}`} alt={laptop.model} />
          </div>
        </div>

        {/* Right Side: Content & Actions */}
        <div className="hero-content-section">
          <div className="hero-specs-box">
            <h3>{laptop.model}</h3>
            <div className="specs-list">
              <p>
                <span>Brand:</span> {laptop.brand}
              </p>
              <p>
                <span>Processor:</span> {laptop.specs?.processor}
              </p>
              <p>
                <span>RAM:</span> {laptop.specs?.ram}
              </p>
            </div>
            <h4 className="hero-price">₹{laptop.pricing?.perDay} / day</h4>
          </div>

          <div className="hero-button-group">
            <button className="btn-secondary">View Details</button>
            <button
              className="btn-primary"
              onClick={() => handleRentNow(laptop)}
            >
              Rent Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
