import React from "react";
import About from "../../components/About";
import Home from "../../components/Home";
import Products from "../../components/Products";
import ScrollToTop from "../../components/ScrollToTop";
import Testimonials from "../../components/Testimonials";

const HomePage = () => {
  return (
    <>
      <Home />
      <About />
      <Products />
      <Testimonials />
      <ScrollToTop />
    </>
  );
};

export default HomePage;
