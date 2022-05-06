import React from "react";
import { useState } from "react";
import { BiArrowToTop } from "react-icons/bi";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) return setVisible(true);
    return setVisible(false);
  };
  window.addEventListener("scroll", toggleVisible);
  return (
    <button
      className='back-to-top'
      onClick={scrollToTop}
      style={{ display: visible ? "flex" : "none" }}>
      <BiArrowToTop />
    </button>
  );
};
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export default ScrollToTop;
