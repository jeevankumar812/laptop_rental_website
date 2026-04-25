import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";
import logo from "../assets/laplogo.png";
const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="navbar">
      {/* LEFT - LOGO */}
      <div className="nav-left">
  <Link to="/" className="logo">
    <img src={logo} alt="LaptopRent" className="logo-img" />
  </Link>
</div>

      {/* CENTER - LINKS */}
      <nav className="nav-center">
        <Link to="/">Home</Link>
        <Link to="/laptops">Laptops</Link>
        <Link to="/my-bookings">Bookings</Link>

        {user?.role === "admin" && (
          <Link to="/admin">Admin</Link>
        )}
      </nav>

      {/* RIGHT - AUTH */}
      <div className="nav-right">
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
            <Link to="/profile" className="profile">
              <FaUserCircle size={26} />
            </Link>

            <button className="btn logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;