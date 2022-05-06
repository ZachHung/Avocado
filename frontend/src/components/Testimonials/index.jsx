import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const reviews = [
  {
    name: "Khách hàng 1",
    image: "https://thispersondoesnotexist.com/image",
    review:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea consectetur architecto odit sapiente laboriosam dolore unde. Temporibus dolores mollitia pariatur labore ipsum commodi dignissimos, optio earum maiores vitae, quae molestiae?",
    rating: 4.4,
  },
  {
    name: "Khách hàng 2",
    image: "https://thispersondoesnotexist.com/image",
    review:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea consectetur architecto odit sapiente laboriosam dolore unde. Temporibus dolores mollitia pariatur labore ipsum commodi dignissimos, optio earum maiores vitae, quae molestiae?",
    rating: 5,
  },
  {
    name: "Khách hàng 3",
    image: "https://thispersondoesnotexist.com/image",
    review:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea consectetur architecto odit sapiente laboriosam dolore unde. Temporibus dolores mollitia pariatur labore ipsum commodi dignissimos, optio earum maiores vitae, quae molestiae?",
    rating: 4.8,
  },
];

const StarRating = ({ rating }) => {
  let round = Math.round(rating / 0.5) * 0.5;
  let maxStar = 5;
  return (
    <div className='rating'>
      {[...Array(maxStar)].map((star, index) => {
        return index + 1 <= Math.floor(round) ? (
          <BsStarFill key={index} />
        ) : round % 1 === 0.5 && index === Math.floor(round) ? (
          <BsStarHalf key={index} />
        ) : (
          <BsStar key={index} />
        );
      })}
    </div>
  );
};

const Testimonials = () => {
  return (
    <section id='testimonial'>
      <div className='container'>
        <div className='row'>
          {reviews.map((review, index) => (
            <div className='col-4 col-xs-12' key={index}>
              <div
                className={`review-wrap ${index === 1 ? "active" : ""}`}
                data-aos='zoom-in'>
                <div className='review-content'>
                  <p>{review.review}</p>
                  <div
                    className='review-img bg-img'
                    style={{
                      backgroundImage: `url(${review.image})`,
                    }}></div>
                </div>
                <div className='review-info'>
                  <h3>{review.name}</h3>
                  <StarRating rating={review.rating} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
