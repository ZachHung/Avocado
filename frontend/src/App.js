import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CheckoutPage from "./pages/Checkout";
import HomePage from "./pages/Home";
import "./styles/styles.scss";
import AOS from "aos";
import React from "react";
import ProductDetail from "./pages/ProductDetail";
import ScrollToTop from "./components/ScrollToTop";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Purchase from "./pages/Purchase";

const aosSettings = {
  offset: 120,
  duration: 1500,
  once: false,
  mirror: true,
};

function App() {
  useEffect(() => {
    AOS.init(aosSettings);
    AOS.refresh();
  }, []);

  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === "") {
      window.scrollTo(0, 0);
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [pathname, hash, key]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/purchase" element={<Purchase />} />
      </Routes>
      <ScrollToTop />
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
