import React from "react";
import "./style.scss";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BiCartAlt } from "react-icons/bi";

function isValid(str) {
  if (!str) {
    return false;
  }
  str = str.replace(/^0+/, "") || "0";
  var n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str && n > 0;
}

const ProductDetail = () => {
  const [quanity, setQuanity] = useState(1);
  const [product, setProduct] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "product/" + id)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (target) => {
    if (!target.value) setQuanity(1);
    if (isValid(target.value) && target.value <= 999)
      setQuanity(parseInt(target.value, 10));
  };
  const changeQuanity = (value) => {
    if (value > 0 && value <= 999) setQuanity(value);
  };
  return (
    <div className='row product-detail'>
      <div className='image col-6 col-xs-12'>
        <img
          src={product?.image}
          alt={product?.name}
          data-aos-duration='500'
          data-aos='fade-right'
        />
      </div>
      <div className='col-6 info col-xs-12'>
        <div
          className='info__category category-btn'
          data-aos-duration='500'
          data-aos='fade-down'>
          {product?.category}
        </div>
        <h1 className='info__name' data-aos-duration='500' data-aos='fade-left'>
          {product?.name}
        </h1>
        <h2
          className='info__price'
          data-aos-duration='500'
          data-aos='fade-left'
          data-aos-delay='200'>
          {product?.price} VND
        </h2>
        <p
          className='info__desc'
          data-aos-duration='500'
          data-aos='fade-left'
          data-aos-delay='400'>
          {product?.desc}
        </p>
        <div
          className='info__quanity'
          data-aos-duration='500'
          data-aos='fade-left'
          data-aos-delay='600'>
          <div
            className='align-items-center'
            onClick={() => changeQuanity(quanity - 1)}>
            <AiOutlineMinus />
          </div>
          <input
            type='number'
            min='0'
            max='999'
            value={quanity}
            onChange={(e) => handleChange(e.target)}></input>
          <div
            className='align-items-center'
            onClick={() => changeQuanity(quanity + 1)}>
            <AiOutlinePlus />
          </div>
        </div>
        <button
          className='category-btn active align-items-center'
          data-aos-duration='500'
          data-aos='fade-up'
          data-aos-delay='800'>
          Thêm vào giỏ hàng <BiCartAlt />
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
