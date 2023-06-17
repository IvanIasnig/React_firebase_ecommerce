import React from "react";
import Signin from "./screen/Signin";
import Signup from "./screen/Signup";
import Account from "./screen/Account";
import Cart from "./screen/CartPage";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { CartProvider } from "./context/Cartcontext";
import ProtectedRoute from "./error/ProtectedRoute";
import Admin from "./screen/Admin";
import Details from "./screen/Details";
import CheckOut from "./screen/CheckOut";

function App() {
  return (
    <>
      <AuthContextProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/details/:id"
              element={
                <ProtectedRoute>
                  <Details />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckOut />
                </ProtectedRoute>
              }
            />
          </Routes>
        </CartProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
