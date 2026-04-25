import { Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./Dashboard";
import KYC from "./KYC";
import Laptops from "./Laptops";
import Payments from "./Payments";
import Rentals from "./Rentals";
import Reviews from "./Reviews";
import Users from "./Users";
import "./AdminPage.css";

function AdminPage() {
  return (
    <div className="adminContainer">
      
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">RentByte Admin</h2>

        <nav>
          <NavLink to="/admin" end className="navItem">Dashboard</NavLink>
<NavLink to="/admin/kyc" className="navItem">KYC</NavLink>
<NavLink to="/admin/laptops" className="navItem">Laptops</NavLink>
<NavLink to="/admin/payments" className="navItem">Payments</NavLink>
<NavLink to="/admin/rentals" className="navItem">Rentals</NavLink>
<NavLink to="/admin/reviews" className="navItem">Reviews</NavLink>
<NavLink to="/admin/users" className="navItem">Users</NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="mainContent">
        

        <div className="contentArea">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="kyc" element={<KYC />} />
            <Route path="laptops" element={<Laptops />} />
            <Route path="payments" element={<Payments />} />
            <Route path="rentals" element={<Rentals />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="users" element={<Users />} />
          </Routes>
        </div>
      </main>

    </div>
  );
}

export default AdminPage;