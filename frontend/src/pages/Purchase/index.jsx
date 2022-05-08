import React from "react";
import { Link, useSearchParams } from "react-router-dom";

import "./style.scss";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import axios from "axios";

const Purchase = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [returnData, setReturnData] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}vnpay-return?${searchParams}`)
      .then((res) => {
        setReturnData(res.data);
        return res.data;
      })
      .then(
        (data) =>
          data.message === "Success" &&
          axios
            .post(`${process.env.REACT_APP_API_URL}order`, {})
            .then()
            .catch((err) => console.log(err))
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className='cartPage'>
        <section className='content vnpay'>
          <div className='empty-cart'>
            {returnData !== null ? (
              returnData.message === "Success" ? (
                <>
                  <h1>Thanh toán thành công</h1>
                  <FaCheckCircle />
                  <Link to='/#product-menu' className='confirm-btn'>
                    Tiếp tục mua sắm
                  </Link>
                </>
              ) : (
                <>
                  <h1>Đã có lỗi xảy ra</h1>
                  <FaExclamationCircle />
                  <Link to='/cart' className='confirm-btn'>
                    Về giỏ hàng của bạn
                  </Link>
                </>
              )
            ) : null}
          </div>
        </section>
      </div>
    </>
  );
};

export default Purchase;
