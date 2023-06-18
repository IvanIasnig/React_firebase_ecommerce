import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Bg from "../components/Bg";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser, signInWithGoogle } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <>
      <Bg></Bg>
      <div className="container pt-5" >
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center">Register</h3>
            <p className="card-text">
              Already have an account?
              <Link to="/" className="card-link">
                Sign in.
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group ms-3 mb-1">
              <label htmlFor="exampleInputEmail1">Email </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="form-group ms-3 mb-2">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <button type="submit" className="btn btn-primary ms-3">
              Sign Up
            </button>
            <button onClick={handleGoogleSignIn} className="btn btn-danger m-3">
              Register with Google
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
