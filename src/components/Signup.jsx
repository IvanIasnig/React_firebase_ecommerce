import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";

function Signup() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');

  const {createUser} = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try{
      await createUser(email, password)
    }
    catch (e){
      setError(e.message)
      console.log(e.message)
    }
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Signup</h3>
          <p className="card-text">
            Already have an account?
            <Link to="/" className="card-link">
              Sign in.
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
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
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
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
