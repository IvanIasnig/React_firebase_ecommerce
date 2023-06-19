import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";
import Bg from "../components/Bg";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn, signInWithGoogle } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await signIn(email, password);
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/account");
      }
    } catch (e) {
      console.log(e.message);
      setError(e.message);
    }
  };

  const handleGoogleSignIn = async () => {

    try {
      const user = await signInWithGoogle();
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/account");
      }
    } catch (e) {
      console.log(e.message);
      setError(e.message);
    }
  };

  return (
    <>
      <Bg></Bg>
        <div className="container pt-5">
          <div className="card pe-3">
            <div className="card-body ">
              <h3 className="card-title text-center">Login</h3>
              <p className="card-text">
                Don't have an account?
                <Link to="/signup" className="card-link">
                  Sign up.
                </Link>
              </p>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
            </div>
            <form className="ms-3" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div className="form-group mt-1">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <button type="submit" className="btn btn-primary my-2 w-100">
                Sign In
              </button>
              <button
                onClick={handleGoogleSignIn}
                className="btn btn-danger  mb-3 w-100"
              >
                Login with Google
              </button>
            </form>
          </div>
        </div>
    </>
  );
}

export default Signin;
