import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './TestimonialSlider.css'

const TestimonialSlider = ({ theme }) => {
  const testimonials = [
    {
      text: "These posters transformed my living room! The quality exceeded my expectations and delivery was super fast.",
      name: "Sandeep",
      location: "Mumbai, India",
      avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
    },
    {
      text: "The frames are absolutely stunning. I've received so many compliments from guests about my gallery wall.",
      name: "Manisha",
      location: "UP",
      avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
    },
    {
      text: "Excellent customer service and beautiful products. Will definitely be ordering more for my office space!",
      name: "Vikas Roy",
      location: "Raipur",
      avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true
  };

  return (
    <div className={`testimonials ${theme}`}>
      <h2 className="testimonial-title">What Our Customers Say</h2>
      <div className="testimonial-slider-container">
        <Slider {...settings}>
          {testimonials.map((testimonial, i) => (
            <div key={i} className="testimonial-slide">
              <div className="testimonial-content">
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="author-avatar"
                  />
                  <div className="author-info">
                    <h5 className="author-name">{testimonial.name}</h5>
                    <span className="author-location">{testimonial.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TestimonialSlider;