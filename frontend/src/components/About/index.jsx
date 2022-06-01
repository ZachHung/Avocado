import React from "react";

const About = () => {
  return (
    <section className='about fullheight align-items-center' id='about'>
      <div className='container'>
        <div className='row'>
          <div className='col-7 h-xs'>
            <img
              src='https://images.unsplash.com/photo-1622704430654-efc23177434a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
              alt=''
              className='fullwidth '
              data-aos='fade-right'
            />
          </div>
          <div className='col-5 col-xs-12 align-items-center'>
            <div className='about-slogan ' data-aos='new-fade-left'>
              <h3>
                Giá trị
                <span className='primary-color'> thật</span>, ấn tượng
                <span className='primary-color'> thật </span>
              </h3>
              <p>
                Sản phẩm chúng tôi là sản phẩm bơ Đăk Lăk được lấy từ vườn tại
                địa phương và đều đạt chuẩn{" "}
                <span className='primary-color'>VietGAP</span>. Không những thế
                các sản phẩm sau khi hái đều được chúng tôi bảo quản cẩn thận để
                khi đến tay khách hàng vẫn giữ được vị tươi ngon, mùi vị đặc
                trưng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
