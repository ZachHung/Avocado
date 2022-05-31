import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const reviews = [
  {
    name: "Bạn Thành Long",
    image:
      "https://scontent.fhan4-3.fna.fbcdn.net/v/t1.6435-9/74912299_2288527144772836_6476368970751410176_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=pvM2bmL6kKAAX96Fiw9&_nc_ht=scontent.fhan4-3.fna&oh=00_AT_QJRwVhmSKXV2GCtq8KzP-clG2QjZd9Egz8aFehn-wqA&oe=62BAC144",
    review:
      "Cty mình toàn đặt đồ ăn vặt ở đây qua app foody, ngon khỏi chê mà sạch nữa chứ. 10 người mua hàng hết hơn nửa là mấy anh fooddy mua rồi, đủ hiểu độ hot của quán này rồi.",
    rating: 4.4,
  },
  {
    name: "Chị Bảo Ly ",
    image:
      "https://kenh14cdn.com/thumb_w/660/2020/5/25/original-2-15904048419461374664211.jpg",
    review:
      "Bơ ở đây mà không ngon thì không biết mua bơ ở đâu mới ngon luôn đó mn ơi, đặc biệt là dưa lưới và dừa sáp. Mình hay mua về làm sinh tố, ngon siu đỉnh, sẽ tiếp tục ghé mua.",
    rating: 5,
  },
  {
    name: "Anh Phước Vinh",
    image:
      "https://thuonggiaonline.vn/tgo-media/images/2016/07/lam-nhan-vien-chua-day-nua-nam-con-trai-ong-trinh-xuan-thanh-duoc-don-lam-pho-phong-o-halico-11-102046.jpg",
    review:
      "Sản phẩm ở đây rất ngon, không những bơ mà kem bơ lẫn sinh tố bơ đều rất ngon và bổ dương, chất lượng cao mà giá cả phải chăng. Sẽ tiếp tục ủng hộ trong tương lai 🥑🥑🥑",
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
                data-aos='zoom-in'
              >
                <div className='review-content'>
                  <p>{review.review}</p>
                  <div
                    className='review-img bg-img'
                    style={{
                      backgroundImage: `url(${review.image})`,
                    }}
                  ></div>
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
