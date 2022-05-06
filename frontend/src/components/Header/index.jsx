import { useState } from "react";
import {
  BiHome,
  BiWinkSmile,
  BiFoodMenu,
  BiCommentDetail,
  BiCartAlt,
} from "react-icons/bi";
import { Link } from "react-router-dom";

const navItem = [
  { id: "home", name: "Trang chủ", icon: <BiHome /> },
  { id: "about", name: "Giới thiệu", icon: <BiWinkSmile /> },
  { id: "product-menu", name: "Sản phẩm", icon: <BiFoodMenu /> },
  { id: "testimonial", name: "Đánh giá", icon: <BiCommentDetail /> },
];

const Header = () => {
  const [active, setActive] = useState(navItem[0].id);

  return (
    <>
      {/* MOBILE NAV  */}
      <div className='mb-nav'>
        <div
          className={"mb-move-item"}
          style={{
            left:
              navItem
                .map(function (e) {
                  return e.id;
                })
                .indexOf(active) *
                25 +
              "%",
          }}></div>
        {navItem.map((item) => (
          <div
            className={`mb-nav-item ${active === item.id ? "active" : ""}`}
            onClick={() => setActive(item.id)}
            key={item.id}>
            <a href={"#" + item.id}>{item.icon}</a>
          </div>
        ))}
      </div>
      {/* END MOBILE NAV  */}
      {/* hrefP NAVIGATION  */}
      <div className='nav'>
        <div className='menu-wrap'>
          <Link to='/'>
            <div className='logo'>Avocado</div>
          </Link>
          <div className='menu h-xs'>
            {navItem.map((item) => (
              <Link to={`/#` + item.id} key={item.id}>
                <div
                  className={`menu-item ${active === item.id ? "active" : ""}`}
                  onClick={() => setActive(item.id)}>
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
          <div className='right-menu'>
            <div className='cart-btn'>
              <BiCartAlt />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
