import React from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Products from "./Products";

const Account = () => {
  const { user, logout } = UserAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out')
    }
    catch (e) {
      console.log(e.message)
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Account</h1>
          <p className="card-text">User email: {user && user.email }</p>
          <button onClick={handleLogout} className="btn btn-primary">Logout</button>
          
        </div>
      </div>
      <Products />
    </div>
  );
}

export default Account;
