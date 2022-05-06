import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CheckoutPage from "./pages/Checkout";
import HomePage from "./pages/Home";
import "./styles/styles.scss";
import AOS from "aos";
import React from "react";

const aosSettings = {
  offset: 120,
  duration: 1500,
  once: false,
  mirror: true,
};

function App() {
  React.useEffect(() => {
    AOS.init(aosSettings);
    AOS.refresh();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='checkout' element={<CheckoutPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
