import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className='footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-6 col-xs-12'>
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
          <div className='col-2 col-xs-12'>
            <h1>Về Avocado</h1>
            <br />
            <p>
              <Link to='#'>Chefs</Link>
            </p>
            <p>
              <Link to='#'>Menu</Link>
            </p>
            <p>
              <Link to='#'>Testimonials</Link>
            </p>
            <p>
              <Link to='#'>Lorem ipsum</Link>
            </p>
          </div>
          <div className='col-4 col-xs-12'>
            <h1>Đăng ký nhận thông tin</h1>
            <br />
            <p>
              Nếu bạn hứng thú với các sản phẩm của chúng tôi, hãy đăng ký nhận
              email của chúng tôi. <br />
              Chúng tôi sẽ gửi bạn email mỗi khi có những deals hấp dẫn cũng như
              thông báo về những sản phẩm mới mà bạn có thể hứng thú.
            </p>
            <div className='input-group'>
              <input type='text' placeholder='Nhập email của bạn' />
              <button>Đăng ký</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
