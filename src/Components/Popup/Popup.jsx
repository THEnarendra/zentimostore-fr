import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { CartContext } from "../../CartContext";
import { toast, Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import "./Popup.css";
import { useNavigate } from "react-router-dom";

const Popup = ({ togglePopup, id, img, setIsCartOpen }) => {
  const { addToCart, cart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Disable interactions while loading
  useEffect(() => {
    document.body.style.opacity = loading ? "0.5" : "1";
    document.body.style.pointerEvents = loading ? "none" : "auto";
  }, [loading]);

  // Stop loading when the cart updates
  useEffect(() => {
    if (loading) setLoading(false);
  }, [cart]);

  return (
    <>
      {loading && (
        <div className="overlay">
          <Loader />
        </div>
      )}
      <Toaster />

      {img
        ?.filter((e) => e._id === id)
        .map((data) => (
          <Row className="row1" key={data._id}>
            <span onClick={togglePopup} className="btPopup">
              ❌
            </span>
            <Col className="d-flex align-items-center flex-column justify-content-center" lg={6}>
              <img className="img12" src={data.productImages[0]?.url} alt="product" />
            </Col>
            <Col className="d-flex flex-column justify-content-center" lg={6}>
              <span>Framerang</span>
              <h1>{data.productName}</h1>

              {/* ✅ Show Price Based on Variants */}
              {data.hasVariants ? (
                <>
                  <div>
                    {data.variants.map((variant) => (
                      <div key={variant._id} className="variant-group">
                        <p>
                          <strong>{variant.variantName}:</strong>
                        </p>
                        <div>
                          {variant.options.map((option) => (
                            <button
                              key={option._id}
                              className={`bt3 me-3 ${selectedVariant?.value === option.value ? "selected" : ""}`}
                              onClick={() => {
                                setSelectedVariant({ ...option, variantName: variant.variantName });
                                setError(false);
                              }}
                            >
                              {option.value}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {selectedVariant && (
                    <div className="mt-2">
                      <span style={{ textDecoration: "line-through", color: "gray" }}>
                        Rs. {selectedVariant.price.oldPrice}
                      </span>
                      &nbsp;&nbsp;&nbsp;
                      <span style={{ fontSize: "22px" }}>Rs. {selectedVariant.price.newPrice}</span>
                    </div>
                  )}
                  {error && <p style={{ color: "red" }}>! Please Select Size First </p>}
                </>
              ) : (
                <div className="mt-2">
                  <span style={{ fontSize: "22px" }}>Rs. {data.basePrice}</span>
                </div>
              )}

              <br />
              <div className="d-flex">
                <button
                  onClick={() => {
                    if (data.hasVariants && !selectedVariant) {
                      setError(true);
                    } else {
                      setLoading(true);
                      addToCart({
                        ...data,
                        selectedVariant: selectedVariant
                          ? {
                              name: selectedVariant.variantName,
                              value: selectedVariant.value,
                              price: selectedVariant.price.newPrice,
                            }
                          : null,
                      });

                      toast.success("Product Added to Cart Successfully");
                      togglePopup();
                    }
                  }}
                  className="bt4"
                  disabled={loading} // Disable while adding
                >
                  {loading ? "Adding..." : "ADD TO CART"}
                </button>
                <button
                  onClick={() => navigate("/ProductPage", { state: { product: data } })}
                  className="bt4 ms-2"
                >
                  MORE DETAILS
                </button>
              </div>
            </Col>
          </Row>
        ))}
    </>
  );
};

export default Popup;
