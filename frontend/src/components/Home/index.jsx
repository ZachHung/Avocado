import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section
      id='home'
      className='fullheight align-items-center bg-img bg-img-fixed'
      style={{
        backgroundImage: `url(assets/brooke-lark-08bOYnH_r_E-unsplash.jpg)`,
      }}
    >
      <div className='container'>
        <div className='row'>
          <div className='col-6 col-xs-12'>
            <div className='slogan'>
              <h1 className='aos-item' data-aos='fade-right'>
                Bơ sáp Đăk Lăk
              </h1>
              <p
                className='aos-item'
                data-aos='fade-right'
                data-aos-delay='200'
              >
                Bơ sáp Đắk Lắk là loại bơ được nhiều người yêu thích bởi giá trị
                dinh dưỡng rất cao, hương vị thơm ngon và nhiều tác dụng tích
                cực tới sức khoẻ con người.
              </p>
              <div
                className='aos-item'
                data-aos='fade-right'
                data-aos-delay='400'
              >
                <Link
                  to='/product/627341d53cfe402cb362eae3'
                  className='linkBtn'
                >
                  Mua ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
