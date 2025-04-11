import React from "react";
import "./App.css";
import { Toaster } from "sonner"; // Added Toaster import
import Hero from "./components/Hero/Hero";
import Header from "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route } from "react-router-dom";
import Video from "./components/Advertisement/Video";
import Women from "./components/WomenScroll/Women";
import Men from "./components/Men/Men";
import Book from "./components/Book/Book";
import BookingForm from "./components/Book/BookingForm";
import ForgotPassword from "./pages/LoginSignup/ForgotPassword";
import Footer from "./components/Footer/Footer";
import LoginSignup from "./pages/LoginSignup/LoginSignup";
import Product from "./pages/ProductDetail/Product";
import { CartProvider } from "./CartContext/CartContext";
import Mens from "./pages/MenShop/Mens";
import Womens from "./pages/WomenShop/Womens";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import { ReviewProvider } from "./ReviewContext/ReviewContext";
import ScrollTag from "./components/ScrollingTag/ScrollTag";
import CartPage from "./pages/CartPage/CartPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import MyOrders from "./components/Myorder/MyOrders";
import TrackOrder from "./components/TrackOrder/TrackOrder";
import { AuthProvider } from "./AuthContext"; // Import the AuthProvider

function App() {
  return (
    <>
      <ScrollTop />
      {/* Wrap the entire app with AuthProvider */}
      <AuthProvider>
        <CartProvider>
          <ReviewProvider>
            <Toaster richColors position="top-right" /> {/* Added Toaster here */}
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <Women />
                    <Men />
                    <Video />
                    <Book />
                    <ScrollTag />
                  </>
                }
              />
              <Route path="/women" element={<Women />} />
              <Route path="/men" element={<Men />} />
              <Route path="/booking-form" element={<BookingForm />} />
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/mens" element={<Mens />} />
              <Route path="/womens" element={<Womens />} />
              <Route path="/scrolltag" element={<ScrollTag />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/track-order" element={<TrackOrder />} />
            </Routes>
            <Footer />
          </ReviewProvider>
        </CartProvider>
      </AuthProvider> {/* Closing AuthProvider */}
    </>
  );
}

export default App;
