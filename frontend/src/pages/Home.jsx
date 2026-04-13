import React, { useEffect, useState } from "react";
import HeroBanner from "../components/home/HeroBanner";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [laptops, setLaptops] = useState([]);
  const navigate = useNavigate();

  const baseURL = "http://localhost:8000/";

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const res = await API.get("/laptops");
        setLaptops(res.data);
      } catch (error) {
        console.error("Error fetching laptops:", error);
      }
    };

    fetchLaptops();
  }, []);

  // 🔥 Categorize laptops
  const officeLaptops = laptops.filter(
    (lap) => lap.category === "Office"
  );

  const gamingLaptops = laptops.filter(
    (lap) => lap.category === "Gaming"
  );

  const handleRentNow = (laptop) => {
    navigate("/checkout", { state: { laptop } });
  };

  return (
    <div className="home-container">
      {/* 🔥 HERO SECTION */}
      <HeroBanner />

      {/* 🔥 OFFICE LAPTOPS */}
      <div className="category-section">
        <h2>Office Laptops</h2>
        <div className="scroll-row">
          {officeLaptops.map((laptop) => (
            <div className="netflix-card" key={laptop._id}>
              <img
                src={`${baseURL}${laptop.images?.[0]}`}
                alt={laptop.model}
              />
              <div className="card-info">
                <h4>{laptop.model}</h4>
                <p>₹{laptop.pricing?.perDay}/day</p>
                <button onClick={() => handleRentNow(laptop)}>
                  Rent Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 GAMING LAPTOPS */}
      <div className="category-section">
        <h2>Gaming Laptops</h2>
        <div className="scroll-row">
          {gamingLaptops.map((laptop) => (
            <div className="netflix-card" key={laptop._id}>
              <img
                src={`${baseURL}${laptop.images?.[0]}`}
                alt={laptop.model}
              />
              <div className="card-info">
                <h4>{laptop.model}</h4>
                <p>₹{laptop.pricing?.perDay}/day</p>
                <button onClick={() => handleRentNow(laptop)}>
                  Rent Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;