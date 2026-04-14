import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Profile from "./pages/user/Profile";
import UploadKYC from "./pages/user/UploadKYC";
import Dashboard from "./pages/admin/Dashboard";
import Checkout from "./pages/rental/CheckOut";
import RentalSuccess from "./pages/rental/RentalSuccess";
import MyBooking from "./pages/user/MyBooking";
import ForgotPassword from "./components/forms/ForgotPassword";
import ResetPassword from "./components/forms/ResetPassword";
import LaptopDetails from "./pages/rental/LaptopDetails";
import LaptopPage from "./pages/rental/LaptopPage";
import { useState } from "react";
import "./App.css";
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
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/laptops/details/:id" element={<LaptopDetails />} />
        <Route path="/rental-success/:id" element={<RentalSuccess />} />
        <Route path="/my-bookings" element={<MyBooking />} />
        <Route path="/laptops" element={<LaptopPage />} />
        <Route
          path="/profile"
          element={<Profile user={user} updateUser={updateUser} />}
        />
        <Route
          path="/upload-kyc"
          element={<UploadKYC updateUser={updateUser} />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default App;
