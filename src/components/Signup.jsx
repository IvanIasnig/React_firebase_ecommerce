import React from "react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Signin to your account</h3>
          <p className="card-text">
            Already have an account?
            <Link to="/" className="card-link">
              Sign in.
            </Link>
          </p>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            ></input>
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
