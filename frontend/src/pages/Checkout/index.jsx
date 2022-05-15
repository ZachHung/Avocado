import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModalPopUp from "../../components/Modal";
import { FaRegSadTear, FaTruck, FaTimes } from "react-icons/fa";
import { BiMinus, BiPlus } from "react-icons/bi";
import { currentChange, isValid } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import "./style.scss";
import { useRef } from "react";
import axios from "axios";
import {
  changeProductQuantity,
  removeFromCart,
  resetCart,
  setFormData,
} from "../../redux/cartSlice";
import { toast } from "react-toastify";

const payments = [
  {
    name: "vnpay",
    img: "vnPay-icon.png",
    message:
      "Thẻ ATM / Internet Banking\nThẻ tín dụng (Credit card) / Thẻ ghi nợ (Debit card)\nVNPay QR",
  },
  { name: "cod", icon: <FaTruck />, message: "Thanh toán khi nhận hàng" },
];
const getTotal = (cart) => {
  var total = 0;
  for (let item of cart) {
    total += item.price * item.quanity;
  }
  return total;
};

const notify = () =>
  toast.success("Đã xoá khỏi giỏ hàng", {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
const CheckoutPage = () => {
  const [modalState, setModalState] = useState();
  const [payment, setPayment] = useState(null);
  const [deleteItem, setDeleteItem] = useState("");
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef();

  const handleChange = (target, _id) => {
    if (!target.value) dispatch(changeProductQuantity({ newQuanity: 1, _id }));
    if (isValid(target.value) && target.value <= 9999)
      dispatch(changeProductQuantity({ newQuanity: target.value, _id }));
  };
  const handleFormSubmit = (values) => {
    dispatch(setFormData({ ...values }));
    if (payment === "cod")
      axios.post(`${process.env.REACT_APP_API_URL}order`, values).then(() => {
        navigate("../purchase");
      });
    else {
      let formData = {
        amount: getTotal(cart) + 15000,
        orderDescription: `Thanh toan don hang ${
          getTotal(cart) + 15000
        } VND tai Avocado`,
        orderType: 100000,
      };
      axios
        .post(
          `${process.env.REACT_APP_API_URL}vnpay-create-payment-url`,
          formData
        )
        .then((res) => window.location.replace(res.data))
        .catch((err) => console.log(err));
    }
    dispatch(resetCart());
  };

  const validateForm = (values) => {
    const errors = {};
    if (!values.email) errors.email = "Trường này không được trống";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
      errors.email = "Địa chỉ email không hợp lệ";
    if (!values.name) errors.name = "Trường này không được trống";
    if (!values.phoneNumber) errors.phoneNumber = "Trường này không được trống";
    else if (!/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(values.phoneNumber))
      errors.phoneNumber = "Số điện thoại không hợp lệ";
    if (!values.addressdetail)
      errors.addressdetail = "Trường này không được trống";
    if (!values.province) errors.province = "Trường này không được trống";
    if (!values.district) errors.district = "Trường này không được trống";
    if (!values.ward) errors.ward = "Trường này không được trống";
    return errors;
  };
  const handleRemoveItem = (id) => {
    setDeleteItem(id);
    setModalState(true);
  };

  const handleRemoveModal = () => {
    dispatch(removeFromCart({ _id: deleteItem }));
    notify();
  };

  return (
    <div className='cartPage'>
      <ModalPopUp
        name='giỏ hàng'
        modalState={modalState}
        handelClickConfirm={handleRemoveModal}
        toogleState={setModalState}
      />
      <section className='content'>
        <aside
          className='box cart-container'
          data-aos='fade-right'
          data-aos-duration='800'
        >
          <div className='box__heading'>
            <span>1</span>
            <h2>Giỏ hàng</h2>
          </div>
          {!cart.length ? (
            <div className='empty-cart'>
              <FaRegSadTear className='faSadTear' />
              <h2 className='error__title'>Giỏ hàng của bạn đang trống</h2>
              <h3 className='error__subtitle'>
                Hãy tiếp tục mua sắm để có thể thanh toán
              </h3>
              <Link to='/#product-menu' className='cancel-btn'>
                Mua sắm ngay
              </Link>
            </div>
          ) : (
            <>
              <ul className='cart'>
                {cart.map((item, index) => (
                  <li className='cart__item' key={index}>
                    <div className='item__image'>
                      <Link to={`/product/${item._id}`}>
                        <img src={item.image} alt={item.name} />
                      </Link>
                    </div>
                    <div className='item__detail'>
                      <FaTimes
                        className={"fa-times"}
                        onClick={() => handleRemoveItem(item._id)}
                      />
                      <h2 className='detail__product-name'>{item.name}</h2>
                      <div className='detail__item-price'>
                        {currentChange(item.price)}
                      </div>
                      <div className='detail__quantity'>
                        <button
                          className='decrease-item'
                          disabled={item.quanity === 1}
                          onClick={() =>
                            dispatch(
                              changeProductQuantity({
                                _id: item._id,
                                newQuanity: item.quanity - 1,
                              })
                            )
                          }
                        >
                          <BiMinus />
                        </button>
                        <input
                          className='quantity'
                          type='number'
                          size='4'
                          maxLength='12'
                          min='1'
                          max='999'
                          step='1'
                          value={item.quanity}
                          onChange={(e) => handleChange(e.target, item._id)}
                        />
                        <button
                          className='increase-item'
                          onClick={() =>
                            dispatch(
                              changeProductQuantity({
                                _id: item._id,
                                newQuanity: parseInt(item.quanity) + 1,
                              })
                            )
                          }
                        >
                          <BiPlus />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className='order '>
                <dl className='order__summary sub-total'>
                  <dt className='order__summary--label primary-color'>
                    Giỏ hàng
                  </dt>
                  <dd className='order__summary--decription'>
                    {currentChange(getTotal(cart))}
                  </dd>
                </dl>
                <dl className='order__summary shipping-fee'>
                  <dt className='order__summary--label primary-color'>
                    Phí vận chuyển
                  </dt>
                  <dd className='order__summary--decription'>
                    {currentChange(15000)}
                  </dd>
                </dl>
              </div>
              <div className='total'>
                <dl className='order__summary'>
                  <dt className='order__summary--label primary-color'>
                    Tổng cộng
                  </dt>
                  <dd className='order__summary--decription'>
                    {currentChange(getTotal(cart) + 15000)}
                  </dd>
                </dl>
              </div>
            </>
          )}
        </aside>
        {cart.length ? (
          <div className='right'>
            <div
              className='box delivery-info'
              data-aos='fade-left'
              data-aos-duration='800'
              data-aos-delay='200'
            >
              <div className='box__heading'>
                <span>2</span>
                <h2>Thông tin vận chuyển</h2>
              </div>
              <div className='user-information'>
                <h2 className='sub-heading'>
                  Hãy chắc chắn rằng thông tin vận chuyển của bạn là chính xác
                </h2>
                <Formik
                  innerRef={formRef}
                  initialValues={{
                    name: "",
                    phoneNumber: "",
                    email: "",
                    province: "",
                    district: "",
                    ward: "",
                    addressdetail: "",
                    products: cart.map((item) => {
                      return { productId: item._id, quanity: item.quanity };
                    }),
                  }}
                  validate={(values) => validateForm(values)}
                  onSubmit={(values) => handleFormSubmit(values)}
                >
                  {({ values, errors, touched, handleChange, handleBlur }) => (
                    <form className='row' id='checkout-form'>
                      <div className='form-group col-6'>
                        <input
                          className={errors.name && "invalid-input"}
                          type='text'
                          name='name'
                          id='name'
                          placeholder=' '
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name}
                        />
                        {errors.name && touched.name ? (
                          <p className='invalid-input'>{errors.name}</p>
                        ) : null}
                        <label htmlFor='name'>Họ và tên</label>
                      </div>
                      <div className='form-group col-6'>
                        <input
                          className={errors.phoneNumber && "invalid-input"}
                          type='tel'
                          id='phoneNumber'
                          name='phoneNumber'
                          placeholder=' '
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.phoneNumber}
                        />
                        {errors.phoneNumber && touched.phoneNumber ? (
                          <p className='invalid-input'>{errors.phoneNumber}</p>
                        ) : null}
                        <label htmlFor='phoneNumber'>Số điện thoại</label>
                      </div>
                      <div className='form-group col-12'>
                        <input
                          className={errors.email && "invalid-input"}
                          type='email'
                          id='email'
                          name='email'
                          placeholder=' '
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                        />
                        {errors.email && touched.email ? (
                          <p className='invalid-input'>{errors.email}</p>
                        ) : null}
                        <label htmlFor='email'>Email</label>
                      </div>
                      <div className='form-group col-12'>
                        <input
                          type='text'
                          className={errors.province && "invalid-input"}
                          id='province'
                          placeholder=' '
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {errors.province && touched.province ? (
                          <p className='invalid-input'>{errors.province}</p>
                        ) : null}
                        <label htmlFor='province'>Tỉnh/thành phố</label>
                      </div>
                      <div className='form-group col-6'>
                        <input
                          type='text'
                          className={errors.district && "invalid-input"}
                          id='district'
                          placeholder=' '
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name='district'
                        />
                        {errors.district && touched.district ? (
                          <p className='invalid-input'>{errors.district}</p>
                        ) : null}
                        <label htmlFor='district'>Quận/huyện</label>
                      </div>
                      <div className='form-group col-6'>
                        <input
                          type='text'
                          id='sub-district'
                          className={errors.ward && "invalid-input"}
                          name='ward'
                          placeholder=' '
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {errors.ward && touched.ward ? (
                          <p className='invalid-input'>{errors.ward}</p>
                        ) : null}
                        <label htmlFor='sub-district'>Phường/xã</label>
                      </div>
                      <div className='form-group col-12'>
                        <input
                          className={
                            errors.addressdetail ? "invalid-input" : ""
                          }
                          type='text'
                          id='addressdetail'
                          placeholder=' '
                          onBlur={handleBlur}
                          onChange={handleChange}
                          aria-describedby='home-number-help'
                          name='addressdetail'
                        />
                        {errors.addressdetail && touched.addressdetail ? (
                          <p className='invalid-input'>
                            {errors.addressdetail}
                          </p>
                        ) : null}
                        <label htmlFor='addressdetail'>
                          Số nhà, toà nhà, tên đường
                        </label>
                        <small>
                          VD: Phòng 409, Toà nhà 3, Đường Dương Kỳ Hiệp{" "}
                        </small>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
            <div
              className='box payment-method'
              data-aos='fade-left'
              data-aos-once='true'
              data-aos-durration='800'
            >
              <div className='box__heading'>
                <span>3</span>
                <h2>Phương thức thanh toán</h2>
              </div>
              <form className='methods row'>
                {payments.map((item, index) => (
                  <label
                    key={index}
                    className={`${
                      payment !== item.name ? "disabled" : "checked"
                    }`}
                  >
                    <span className='methods__custom-radio'>
                      <input
                        type='radio'
                        autoComplete='off'
                        value={item.name}
                        checked={payment === item.name}
                        onChange={(e) => setPayment(e.target.value)}
                      />
                    </span>
                    <span className={"methods__icon"}>
                      {item.img ? (
                        <img src={`/assets/${item.img}`} alt='' />
                      ) : (
                        item.icon
                      )}
                    </span>
                    <span className='methods__name'>{item.message}</span>
                  </label>
                ))}
                <div className='formBtn'>
                  <button
                    type='button'
                    className='confirm-btn'
                    disabled={payment === undefined}
                    onClick={() =>
                      formRef.current && formRef.current.handleSubmit()
                    }
                  >
                    Thanh toán
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <></>
        )}
      </section>
    </div>
  );
};

export default CheckoutPage;
