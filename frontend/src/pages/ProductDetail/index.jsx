import React from "react";
import "./style.scss";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BiCartAlt } from "react-icons/bi";
import { currentChange, isValid, Request } from "../../utils";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";

const notify = () =>
  toast.success("Đã thêm vào giỏ hàng", {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

const ProductDetail = () => {
  const [quanity, setQuanity] = useState(1);
  const [product, setProduct] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    Request.get(`/product/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quanity,
      })
    );
    notify();
  };

  const handleChange = (target) => {
    if (!target.value) setQuanity(1);
    if (isValid(target.value) && target.value <= 9999)
      setQuanity(parseInt(target.value, 10));
  };
  const changeQuanity = (value) => {
    if (value > 0 && value <= 9999) setQuanity(value);
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
          data-aos='fade-down'
        >
          {product?.category}
        </div>
        <h1 className='info__name' data-aos-duration='500' data-aos='fade-left'>
          {product?.name}
        </h1>
        <h2
          className='info__price'
          data-aos-duration='500'
          data-aos='fade-left'
          data-aos-delay='200'
        >
          {currentChange(product?.price)}
        </h2>
        <p
          className='info__desc'
          data-aos-duration='500'
          data-aos='fade-left'
          data-aos-delay='400'
        >
          {product?.desc}
        </p>
        <div
          className='info__quanity'
          data-aos-duration='500'
          data-aos='fade-left'
          data-aos-delay='600'
        >
          <div
            className='align-items-center'
            onClick={() => changeQuanity(quanity - 1)}
          >
            <AiOutlineMinus />
          </div>
          <input
            type='number'
            min='0'
            max='999'
            value={quanity}
            onChange={(e) => handleChange(e.target)}
          ></input>
          <div
            className='align-items-center'
            onClick={() => changeQuanity(quanity + 1)}
          >
            <AiOutlinePlus />
          </div>
        </div>
        <button
          className='category-btn active align-items-center'
          data-aos-duration='500'
          data-aos='fade-up'
          data-aos-delay='800'
          onClick={handleAddToCart}
        >
          Thêm vào giỏ hàng <BiCartAlt />
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
