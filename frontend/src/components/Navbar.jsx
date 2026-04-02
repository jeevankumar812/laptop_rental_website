import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">LaptopRent</Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/laptops">Laptops</Link>
        </li>

        <li>
          <Link to="/my-bookings">My Bookings</Link>
        </li>

        {user?.role === "admin" && (
          <li>
            <Link to="/admin">Admin Dashboard</Link>
          </li>
        )}
      </ul>

      <div className="auth-buttons">
        {!user ? (
          <>
            <Link to="/login" className="btn login">
              Login
            </Link>
            <Link to="/signup" className="btn signup">
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="profile-icon">
              <FaUserCircle size={28} />
            </Link>

            <button className="btn logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
