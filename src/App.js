import React from "react";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Account from "./components/Account";
import Cart from "./components/CartPage";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { CartProvider } from "./context/Cartcontext";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./components/Admin";

function App() {
  return (
    <div>
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
          </Routes>
        </CartProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
