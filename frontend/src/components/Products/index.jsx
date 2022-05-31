import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BiCartAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { currentChange, Request } from "../../utils";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";

const filterProducts = (products, category) => {
  return category === "all"
    ? products
    : products.filter((product) => product.category === category);
};

const CartBtn = ({ item }) => {
  const dispatch = useDispatch();
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
  const handleAddItem = (e, item) => {
    e.preventDefault();
    dispatch(addToCart({ ...item, quanity: 1 }));
    notify();
  };
  return (
    <div className='cart-btn' onClick={(e) => handleAddItem(e, item)}>
      <BiCartAlt />
    </div>
  );
};

const Products = () => {
  const [active, setActive] = useState("all");
  const [products, setProducts] = useState([]);
  const [types, setTypes] = useState([]);
  const [filteredProcducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    Request.get(`/product`)
      .then((res) => {
        setProducts(res.data);
        let unique = [...new Set(res.data.map((item) => item.category))];
        setTypes(unique);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    setFilteredProducts(filterProducts(products, active));
  }, [active, products]);

  return (
    <section
      className='align-items-center bg-img bg-img-fixed'
      id='product-menu'
      style={{
        backgroundImage: `url(assets/katherine-chase-4MMK78S7eyk-unsplash.jpg`,
      }}
    >
      <div className='container'>
        <div className='food-menu'>
          <h1>
            Hôm nay <span className='primary-color'>bạn</span> sẽ{" "}
            <span className='primary-color'>mua gì ?</span>
          </h1>
          <p>
            Chúng tôi cung cấp các loại bơ như{" "}
            <span className='primary-color'>Bơ sáp Đăk Lăk</span>,{" "}
            <span className='primary-color'>Bơ Booth</span>,{" "}
            <span className='primary-color'>Bơ 034</span>,... cũng như các sản
            phẩm được làm từ bơ khác như{" "}
            <span className='primary-color'>Tinh dầu Bơ</span>,{" "}
            <span className='primary-color'>Sinh tố Bơ</span> và{" "}
            <span className='primary-color'>Kem Bơ</span> . Khi mua chúng tôi
            đảm bảo các sản phẩm đều tương ngon, bổ rẻ, giữ mùi vị đăc trưng
            riêng và chất lượng cao.
          </p>
          <div className='food-category'>
            <div data-aos='zoom-in' data-aos-duration='350'>
              <button
                className={active === "all" ? "active" : ""}
                onClick={() => setActive("all")}
              >
                Tất cả
              </button>
            </div>
            {types.map((type, index) => (
              <div
                key={index}
                data-aos='zoom-in'
                data-aos-delay={(index + 1) * 200}
                data-aos-duration='350'
              >
                <button
                  className={active === type ? "active" : ""}
                  onClick={() => setActive(type)}
                >
                  {type}
                </button>
              </div>
            ))}
          </div>

          <div className='food-item-wrap all'>
            {filteredProcducts.map((item, index) => (
              <Link
                to={"/product/" + item._id}
                className='food-item'
                data-aos='fade-up'
                data-aos-duration='500'
                key={index}
              >
                <div className='item-wrap'>
                  <div className='item-img'>
                    <div
                      className='img-holder bg-img'
                      style={{
                        backgroundImage: `url(${item.image})`,
                      }}
                    ></div>
                  </div>
                  <div className='item-info'>
                    <div>
                      <h3>{item.name}</h3>
                      <span>{currentChange(item.price)}</span>
                    </div>
                    <CartBtn item={item} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
