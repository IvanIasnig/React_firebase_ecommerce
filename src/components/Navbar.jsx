import React from "react";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { BsCartPlusFill } from 'react-icons/bs';

function Navbar() {
  const { user, logout } = UserAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5">
  <div className="container-fluid">
    <span className="navbar-brand">Account</span>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <div className="nav-link">{user && user.email}</div>
        </li>
        <li className="nav-item">
          <Link to="/cart" className="nav-link">
            <BsCartPlusFill /> Vai al carrello
          </Link>
        </li>
        <li className="nav-item">
          <button
            className="btn btn-outline-primary my-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
}

export default Navbar;
