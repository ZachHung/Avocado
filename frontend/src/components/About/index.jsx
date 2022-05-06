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
                <span className='primary-color'>We</span> create
                <span className='primary-color'> delicious</span> memories for
                <span className='primary-color'> you</span>
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio
                natus placeat et eos, dignissimos voluptatem tempora
                necessitatibus doloribus! Eum qui doloribus odio dolor tenetur
                nihil impedit vero magni, distinctio soluta!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
