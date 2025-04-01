import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../Product/ProductCard.css';
import './ProductSlider.css';
import Popup from '../Popup/Popup';
const Product_Slider = ({ products, setIsCartOpen }) => {
  const [id, setId] = useState()
  const [showPopup, setShowPopup] = useState(false);
  const Pop = () => {
    setShowPopup(!showPopup);
  }

  useEffect(() => {
    if (showPopup) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showPopup]);
  const filteredProducts = products.filter((product) => product.isFeatured === true)
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };
  // console.log(filteredProducts)
  return (
    <>
      <div className='ps-3 pe-3 product-slider-container'>
        <Slider {...settings}>
          {
            products && products.map((img) => (
              <div className="nft" >
                <div className='main' >
                  <img style={{ cursor: 'pointer' }} className='image011' src={img.productImages[0].url} alt="image" />
                  <h3 style={{ cursor: 'pointer' }} className='creator ps-4 pe-4'>{img.productName}</h3>
                  <p>
              {img?.hasVariants ? (
            <>
              <span>Starting from:</span>&nbsp;&nbsp;
              <br />
              <span className='product-card-price'>
                Rs.{Math.min(...img.variants.flatMap(v => v.options.map(opt => opt.price.newPrice)))}
              </span>
            </>
          ) : (
              <>
                <span>Price:</span>&nbsp;&nbsp;
                <span className='product-card-price'>Rs.{img.basePrice}</span>
              </>
            )}
            </p>
                  <button className='bt1' onClick={() => (setId(img._id), Pop())}>Choose Options</button>

                </div>
              </div>

            ))
          }
        </Slider>
      </div>
      {showPopup === true &&
        <div className="modal-popup">
          <Popup setIsCartOpen={setIsCartOpen} img={products} id={id} togglePopup={Pop} />
        </div>
      }
    </>
  );
};
export default Product_Slider;
