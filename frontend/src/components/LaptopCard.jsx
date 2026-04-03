import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import "./LaptopCard.css";
const LaptopCard = () => {
  const navigate = useNavigate();
  const [laptops, setLaptops] = useState([]);

  const baseURL = "http://localhost:8000/";
  useEffect(() => {
    const fetchLaptop = async () => {
      try {
        const response = await API.get("/laptops");
        setLaptops(response.data);
        console.log("Fetched laptops:", response.data);
      } catch (error) {
        console.error("Error fetching laptop data:", error);
      }
    };
    fetchLaptop();
  }, []);

  const handleRentNow = (laptop) => {
    navigate("/checkout", { state: { laptop } });
  };

  return (
    <div className="laptop-container">
      {laptops.map((laptop) => (
        <div className="laptop-card" key={laptop._id}>
          <img src={`${baseURL}${laptop.images?.[0]}`} alt={laptop.model} />

          <h3>{laptop.model}</h3>

          <p>Brand: {laptop.brand}</p>
          <p>Processor: {laptop.specs?.processor}</p>
          <p>RAM: {laptop.specs?.ram}</p>

          <h4>₹{laptop.pricing?.perDay} / day</h4>

          <button className="rent-btn" onClick={() => handleRentNow(laptop)}>
            Rent Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default LaptopCard;
