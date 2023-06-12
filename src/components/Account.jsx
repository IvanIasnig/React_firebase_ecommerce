import React from "react";

function Account() {
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Account</h1>
          <p className="card-text">User email:</p>
          <button className="btn btn-primary">Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Account;
