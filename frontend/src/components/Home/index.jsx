import React from "react";

const Home = () => {
  return (
    <section
      id='home'
      className='fullheight align-items-center bg-img bg-img-fixed'
      style={{
        backgroundImage: `url(assets/brooke-lark-08bOYnH_r_E-unsplash.jpg)`,
      }}>
      <div className='container'>
        <div className='row'>
          <div className='col-6 col-xs-12'>
            <div className='slogan'>
              <h1 className='aos-item' data-aos='fade-right'>
                Avocado
              </h1>
              <p
                className='aos-item'
                data-aos='fade-right'
                data-aos-delay='200'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae
                eveniet ullam perferendis eos, nobis corrupti similique fuga
                ipsa minus at eius ipsam expedita quam aliquam perspiciatis
                voluptate qui dolore soluta.
              </p>
              <div
                className='aos-item'
                data-aos='fade-right'
                data-aos-delay='400'>
                <button>Mua ngay</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
