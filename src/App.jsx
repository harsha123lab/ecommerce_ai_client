import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
// import ProtectedRoute from './components/ProtectedRoute'; // Use this for protected routes
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              {/* Example of a protected route (optional bonus) */}
              {/* You can add more protected routes here later */}
            </Routes>
          </main>
          <footer className="footer">
            <p>&copy; 2024 ECommerceApp. All rights reserved.</p>
          </footer>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
