import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import UploadKYC from "./pages/UploadKYC";
import AdminDashboard from "./pages/AdminDashboard";
import Checkout from "./pages/CheckOut";
import RentalSuccess from "./pages/RentalSuccess";
import MyBooking from "./pages/MyBooking";
import { useState } from "react";

const App = () => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user")),
  );

  // Single helper used by any page that needs to update the user
  const updateUser = (updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/rental-success/:id" element={<RentalSuccess />} />
        <Route path="/my-bookings" element={<MyBooking />} />
        <Route
          path="/profile"
          element={<Profile user={user} updateUser={updateUser} />}
        />
        <Route
          path="/upload-kyc"
          element={<UploadKYC updateUser={updateUser} />}
        />
      </Routes>
    </>
  );
};

export default App;
