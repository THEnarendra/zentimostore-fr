import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../Popup/Popup';
import './ProductCard.css';

const ProductCard = ({ img, setIsCartOpen }) => {
  const [id, setId] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const Pop = () => {
    setShowPopup(!showPopup);
  };

  const handleProductClick = () => {
    navigate('/ProductPage', { state: { product: img } });
  };

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

  return (
    <>
      <div className="nft">
        {img && (
          <div className='main'>
            <div 
              onClick={handleProductClick} 
              className="image-container"
              style={{ cursor: 'pointer' }}
            >
              <img 
                className='image011' 
                src={img.productImages[0]?.url || 'https://via.placeholder.com/150'} 
                alt={img.productName} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150';
                }}
              />
            </div>
            
            <div className="text-content">
              <h4 
                className='creator' 
                title={img.productName}
              >
                {img.productName}
              </h4>
              
              <p className="price-text">
                {img?.hasVariants ? (
                  <>
                    <span>Starting from: </span>
                    <br />
                    <span className='product-card-price'>
                      Rs.{Math.min(...img.variants.flatMap(v => v.options.map(opt => opt.price.newPrice)))}
                    </span>
                  </>
                ) : (
                  <>
                    <span>Price: </span>
                    <span className='product-card-price'>Rs.{img.basePrice}</span>
                  </>
                )}
              </p>
              
              <button 
                className='bt1' 
                onClick={(e) => {
                  e.stopPropagation();
                  setId(img._id);
                  Pop();
                }}
              >
                Choose Options
              </button>
            </div>
          </div>
        )}
      </div>
      
      {showPopup && (
        <div className="modal-popup">
          <Popup 
            setIsCartOpen={setIsCartOpen} 
            img={[img]} 
            id={id} 
            togglePopup={Pop} 
          />
        </div>
      )}
    </>
  );
};

export default ProductCard;