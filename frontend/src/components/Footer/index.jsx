import React, { useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import axios from "axios";
const Footer = () => {
  const [email, setEmail] = useState("");
  const handleRegister = () => {
    console.log(email);
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
    if (!regex.test(email)) {
      toast.warning("Vui lòng nhập đúng email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      axios
        .post("http://localhost:5000/api/email", {
          email: email,
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success("Đăng ký thành công", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setEmail("");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <section className='footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-6 col-xs-12'>
            <h1 className='logo'>
              <img
                src='https://cf.shopee.vn/file/0ce0d46a858fb639ff4629cb881207cc_tn'
                alt=''
              />
              VFruit
            </h1>
            <br />
            <p>
              Doanh nghiệp chúng tôi với phương châm{" "}
              <span className='secon-color'>khách hàng là trọng tâm,</span> là
              định hướng để phát triển doanh nghiệp. Với định hướng này trong
              những năm tới chúng tôi sẻ tiếp tục cải thiện cơ sở vật chất, sản
              phẩm, đổi ngũ nhân lực để mang thương hiệu của mình tới nhiều
              khách hàng hơn. Từ đó có thể góp phần mang thương hiệu bơ Đăk Lăk
              bay cao hơn không chỉ thị trường trong nước mà còn vươn tầm ra thế
              giới.
            </p>
            <br />
            <p>
              Email:{" "}
              <a href='mailto: avocado-uit@outlook.com' className='secon-color'>
                avocado-uit@outlook.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href='tel: 0983406631' className='secon-color'>
                098 340 6631
              </a>
            </p>
            <p>
              Địa chỉ:{" "}
              <span className='secon-color'>
                4 Lê Duẩn, Bến Nghế, Quận 1, Tp Hồ Chí Minh
              </span>
            </p>
          </div>
          <div className='col-2 col-xs-12'>
            <h1>Về VFruit</h1>
            <br />
            <p>
              <Link to='#'>Nhà sáng lập</Link>
            </p>
            <p>
              <Link to='#product-menu'>Sản phẩm của chúng tôi</Link>
            </p>
            <p>
              <Link to='#testimonial'>Đánh giá người dùng</Link>
            </p>
            <p>
              <Link to='#'>Bài viết</Link>
            </p>
          </div>
          <div className='col-4 col-xs-12'>
            <h1>Đăng ký nhận thông tin</h1>
            <br />
            <p>
              {"    "}Nếu bạn hứng thú với các sản phẩm của chúng tôi, hãy đăng
              ký nhận email của chúng tôi. <br />
              {"    "}Chúng tôi sẽ gửi bạn email mỗi khi có những deals hấp dẫn
              cũng như thông báo về những sản phẩm mới mà bạn có thể hứng thú.
            </p>
            <div className='input-group'>
              <input
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Nhập email của bạn'
              />
              <button onClick={handleRegister}>Đăng ký</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
