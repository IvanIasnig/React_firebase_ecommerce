import React from "react";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { BsCartPlusFill } from "react-icons/bs";
import {AiOutlineHome} from "react-icons/ai"

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
    <nav className="navbar navbar-dark bg-dark mb-5 ">
      <div className="container-fluid justify-content-lg-between">
        <span className="navbar-brand">BsKeyboard</span>
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
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <div className="nav-link">{user && user.email}</div>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link">
                <BsCartPlusFill className="mb-1"/> Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/account" className="nav-link ">
                <AiOutlineHome className="mb-1" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-outline-danger my-2"
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
