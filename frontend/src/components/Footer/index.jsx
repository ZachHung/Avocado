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
    <section className="footer">
      <div className="container">
        <div className="row">
          <div className="col-6 col-xs-12">
            <h1>Avocado</h1>
            <br />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Incidunt, quas harum? Atque eius quaerat fuga sint molestiae illo
              corrupti vitae voluptatibus. Dicta rerum est delectus perspiciatis
              nemo nihil autem! Doloremque?
            </p>
            <br />
            <p>Email: example@mail.com</p>
            <p>Phone: +00 123 456 789</p>
            <p>Website: avocado.com</p>
          </div>
          <div className="col-2 col-xs-12">
            <h1>Về Avocado</h1>
            <br />
            <p>
              <Link to="#">Chefs</Link>
            </p>
            <p>
              <Link to="#">Menu</Link>
            </p>
            <p>
              <Link to="#">Testimonials</Link>
            </p>
            <p>
              <Link to="#">Lorem ipsum</Link>
            </p>
          </div>
          <div className="col-4 col-xs-12">
            <h1>Đăng ký nhận thông tin</h1>
            <br />
            <p>
              Nếu bạn hứng thú với các sản phẩm của chúng tôi, hãy đăng ký nhận
              email của chúng tôi. <br />
              Chúng tôi sẽ gửi bạn email mỗi khi có những deals hấp dẫn cũng như
              thông báo về những sản phẩm mới mà bạn có thể hứng thú.
            </p>
            <div className="input-group">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
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
