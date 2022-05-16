import React from "react";
import { Link, useSearchParams } from "react-router-dom";

import "./style.scss";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { resetForm } from "../../redux/cartSlice";
import { Request } from "../../utils";

const Purchase = () => {
  const [searchParams] = useSearchParams();
  const [returnData, setReturnData] = useState(null);
  const [form, setForm] = useState(null);
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formData);
  useEffect(() => {
    setForm(formData);
    dispatch(resetForm());
    Request.get(`/vnpay-return?${searchParams}`)
      .then((res) => {
        setReturnData(res.data);
        return res.data;
      })
      .then(
        (data) =>
          data.message === "Success" &&
          Request.post(`/order`, formData).catch((err) => console.log(err))
      )
      .catch((err) => console.log(err));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className='cartPage'>
        <section className='content vnpay'>
          <div
            className='empty-cart'
            data-aos='fade-right'
            data-aos-duration='500'
          >
            {returnData !== null ? (
              (returnData.message === "Success" && form !== null) ||
              form !== null ? (
                <section className='box '>
                  <h1 className='primary-color'>Thanh toán thành công</h1>
                  <FaCheckCircle className='primary-color' />
                  <div className='order-detail'>
                    <h3>Thông tin đơn hàng của bạn</h3>
                    <p>
                      <strong>Tên khách hàng:</strong> {form.name}
                    </p>
                    <p>
                      <strong>Số điện thoại:</strong> {form.phoneNumber}
                    </p>
                    <p>
                      <strong>Email:</strong> {form.email}
                    </p>
                    <p>
                      <strong>Địa chỉ nhận hàng:</strong>{" "}
                      {`${form.addressdetail}, ${form.ward}, ${form.district}, ${form.province}`}
                    </p>
                  </div>
                  <Link to='/#product-menu' className='confirm-btn'>
                    Tiếp tục mua sắm
                  </Link>
                </section>
              ) : (
                <section className='box'>
                  <h1 className=''>Đã có lỗi xảy ra</h1>
                  <FaExclamationCircle />
                  <Link to='/checkout' className='confirm-btn'>
                    Về giỏ hàng của bạn
                  </Link>
                </section>
              )
            ) : null}
          </div>
        </section>
      </div>
    </>
  );
};

export default Purchase;
