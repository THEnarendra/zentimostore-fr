import React, { useContext, useEffect, useState } from 'react';
import '../MainCss/checkout.css';
import { Col, Row } from 'react-bootstrap';
import { CartContext } from '../CartContext';
import { toast, Toaster } from "react-hot-toast";
import Loader from '../Components/Loader/Loader';
import { load } from "@cashfreepayments/cashfree-js";

const app_url = process.env.REACT_APP_API_URL;

const CheckOut = ({ setFooter, theme }) => {
  const { cart, getTotal } = useContext(CartContext);
  console.log(cart);
  const [errors, setErrors] = useState({});
  const [input, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: 'India'
  });

  const [loading, setLoading] = useState(false);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeValid, setPincodeValid] = useState(false);
  const [availableCities, setAvailableCities] = useState([]);
  const [availableStates, setAvailableStates] = useState([]);
  const [showPaymentSection, setShowPaymentSection] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [totalAmount, setTotalAmount] = useState(getTotal());

  useEffect(() => {
    setFooter(false);
    return () => setFooter(true);
  }, [setFooter]);

  const Change = (e) => {
    setInputs({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const idArray = cart.map(user => ({
    productId: user._id,
    hasVariants: user.hasVariants,
    selectedVariants: user.selectedVariant ? [{
      variantName: user.selectedVariant.name,
      value: user.selectedVariant.value,
      variantPrice: user.selectedVariant.price,
      quantity: user.quantity || 1,
    }] : [],
    quantity: user.quantity,
  }));

  const validatePincode = async (pincode) => {
    if (!pincode || pincode.length !== 6) {
      setPincodeValid(false);
      return false;
    }
    
    setPincodeLoading(true);
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      
      if (data[0].Status === 'Success') {
        const postOffices = data[0].PostOffice;
        const cities = [...new Set(postOffices.map(office => office.District))];
        const states = [...new Set(postOffices.map(office => office.State))];
        
        setAvailableCities(cities);
        setAvailableStates(states);
        
        if (cities.length === 1 && states.length === 1) {
          setInputs(prev => ({
            ...prev,
            city: cities[0],
            state: states[0]
          }));
        }
        
        setPincodeValid(true);
        return true;
      } else {
        toast.error("Invalid PIN code. Please enter a valid Indian PIN code.");
        setPincodeValid(false);
        return false;
      }
    } catch (error) {
      console.error("Pincode validation error:", error);
      toast.error("Failed to validate PIN code. Please try again.");
      setPincodeValid(false);
      return false;
    } finally {
      setPincodeLoading(false);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.firstName?.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!data.lastName?.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!data.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is invalid';
    }
    if (!data.phone?.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(data.phone)) {
      errors.phone = 'Phone number must be 10 digits';
    }
    if (!data.street?.trim()) {
      errors.street = 'Street is required';
    }
    if (!data.city?.trim()) {
      errors.city = 'City is required';
    }
    if (!data.state?.trim()) {
      errors.state = 'State is required';
    }
    if (!data.pinCode?.trim()) {
      errors.pinCode = 'PIN code is required';
    } else if (!/^[0-9]{6}$/.test(data.pinCode)) {
      errors.pinCode = 'PIN code must be 6 digits';
    } else if (!pincodeValid) {
      errors.pinCode = 'Please enter a valid PIN code';
    }
    if (!data.country?.trim()) {
      errors.country = 'Country is required';
    }
    return errors;
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
    setTotalAmount(e.target.value === "COD" ? getTotal() + 100 : getTotal());
  };

  const handlePincodeBlur = async (e) => {
    const pincode = e.target.value;
    const isValid = await validatePincode(pincode);
    setShowPaymentSection(isValid && pincode.length === 6);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(input);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty. Please add items to proceed.");
      return;
    }
    setLoading(true);
    try {
      setErrors('');
      const response = await fetch(`${app_url}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            "name": `${input.firstName} ${input.lastName}`,
            "email": input.email,
            "contactNumber": input.phone,
            "shippingAddress": {
              "street": input.street,
              "city": input.city,
              "state": input.state,
              "pincode": input.pinCode,
              "country": input.country
            },
            "orderItems": idArray,
            "totalAmount": paymentMethod === "COD" ? totalAmount + 100 : totalAmount,
            "paymentInfo": {
              "method": paymentMethod,
              "transactionId": null,
              "status": "Pending",
            },
          }
        )
      });

      const data = await response.json();
      if (response.ok) {
        if (paymentMethod === "COD") {
          toast.success("Product Ordered Successfully", {
            duration: 3000
          });
          
          setTimeout(() => {
            localStorage.removeItem("cart");
            window.location.href = '/';
          }, 2000);
        }
         else {
          const cashfree = await load({
            mode: "production", 
          });
          const checkoutOptions = {
            paymentSessionId: data.paymentSessionId, 
            redirectTarget: "_self", 
          };
          cashfree.checkout(checkoutOptions);
        }
      } else {
        toast.error(data.error || "Something went wrong! Please try again later!");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong! Please try again later!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      document.body.style.opacity = '0.5';
      document.body.style.pointerEvents = 'none';
    } else {
      document.body.style.opacity = '1';
      document.body.style.pointerEvents = 'auto';
    }
  }, [loading]);

  return (
    <div className={`checkout-page ${theme === "darkTheme" ? "dark-mode" : ""}`}>
      {loading && <div className="overlay"><Loader /></div>}
      <Toaster />
      <Row>
        <Col className='over' sm={12} lg={6}>
          <div className="leftSide">
            <h5 className={theme === "darkTheme" ? "text-light" : "text-dark"}>Contact Info</h5>
            <input 
              onChange={Change} 
              className={`form-control ${theme === "darkTheme" ? "bg-dark text-light" : "bg-light text-dark"}`} 
              type="number" 
              name="phone" 
              placeholder="Contact Number" 
              value={input.phone}
              maxLength="10"
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
            
            <input 
              onChange={Change} 
              className={`form-control mt-2 ${theme === "darkTheme" ? "bg-dark text-light" : "bg-light text-dark"}`} 
              type="email" 
              name="email" 
              placeholder="Email Address" 
              value={input.email}
            />
            {errors.email && <span className="error">{errors.email}</span>}
            
            <h5 className={`mt-3 ${theme === "darkTheme" ? "text-light" : "text-dark"}`}>Delivery Address</h5>
            
            <input 
              onChange={Change} 
              className={`form-control ${theme === "darkTheme" ? "bg-dark text-light" : "bg-light text-dark"}`} 
              type="text" 
              name="country" 
              placeholder="Country/Region" 
              value={input.country}
              readOnly
            />
            
            <Row className="mt-2 g-2">
              <Col sm={12} md={6}>
                <input 
                  onChange={Change} 
                  className={`form-control ${theme === "darkTheme" ? "bg-dark text-light" : "bg-light text-dark"}`} 
                  type="text" 
                  name="firstName" 
                  placeholder="First name" 
                  value={input.firstName}
                />
                {errors.firstName && <span className="error">{errors.firstName}</span>}
              </Col>
              <Col sm={12} md={6}>
                <input 
                  onChange={Change} 
                  className={`form-control ${theme === "darkTheme" ? "bg-dark text-light" : "bg-light text-dark"}`} 
                  type="text" 
                  name="lastName" 
                  placeholder="Last name" 
                  value={input.lastName}
                />
                {errors.lastName && <span className="error">{errors.lastName}</span>}
              </Col>
            </Row>
            
            <input 
              onChange={Change} 
              className={`form-control mt-2 ${theme === "darkTheme" ? "bg-dark text-light" : "bg-light text-dark"}`} 
              type="text" 
              name="street" 
              placeholder="Street Name" 
              value={input.street}
            />
            {errors.street && <span className="error">{errors.street}</span>}
            
            <div className="position-relative mt-3">
              <label htmlFor="pinCode" className={`form-label ${theme === "darkTheme" ? "text-light" : "text-dark"}`}>PIN Code</label>
              <input 
                id="pinCode"
                onChange={Change} 
                onBlur={handlePincodeBlur}
                className={`form-control ${theme === "darkTheme" ? "bg-dark text-light" : "bg-light text-dark"}`} 
                type="text" 
                name="pinCode" 
                placeholder="Enter 6-digit PIN code" 
                value={input.pinCode}
                maxLength="6"
              />
              {pincodeLoading && (
                <div className="position-absolute" style={{ right: "10px", top: "38px" }}>
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              {pincodeValid && !pincodeLoading && (
                <div className="position-absolute" style={{ right: "10px", top: "38px" }}>
                  <i className="bi bi-check-circle-fill text-success"></i>
                </div>
              )}
              {errors.pinCode && <span className="error">{errors.pinCode}</span>}
            </div>
            
            <Row className="mt-2 g-2">
              <Col sm={12} md={6}>
                <label htmlFor="city" className={`form-label ${theme === "darkTheme" ? "text-light" : "text-dark"}`}>City</label>
                {availableCities.length > 0 ? (
                  <select
                    id="city"
                    onChange={Change}
                    className={`form-select ${theme === "darkTheme" ? "bg-dark text-light" : "bg-light text-dark"}`}
                    name="city"
                    value={input.city}
                    disabled={!pincodeValid}
                  >
                    <option value="">Select City</option>
                    {availableCities.map((city, index) => (
                      <option key={index} value={city}>{city}</option>
                    ))}
                  </select>
                ) : (
                  <input 
                    id="city"
                    onChange={Change} 
                    className={`form-control ${theme === "darkTheme" ? "bg-dark text-light" : "bg-light text-dark"}`} 
                    type="text" 
                    name="city" 
                    placeholder="City" 
                    value={input.city}
                    disabled={!pincodeValid}
                  />
                )}
                {errors.city && <span className="error">{errors.city}</span>}
              </Col>
              <Col sm={12} md={6}>
                <label htmlFor="state" className={`form-label ${theme === "darkTheme" ? "text-light" : "text-dark"}`}>State</label>
                {availableStates.length > 0 ? (
                  <select
                    id="state"
                    onChange={Change}
                    className={`form-select ${theme === "darkTheme" ? "bg-dark text-light" : "bg-light text-dark"}`}
                    name="state"
                    value={input.state}
                    disabled={!pincodeValid}
                  >
                    <option value="">Select State</option>
                    {availableStates.map((state, index) => (
                      <option key={index} value={state}>{state}</option>
                    ))}
                  </select>
                ) : (
                  <input 
                    id="state"
                    onChange={Change} 
                    className={`form-control ${theme === "darkTheme" ? "bg-dark text-light" : "bg-light text-dark"}`} 
                    type="text" 
                    name="state" 
                    placeholder="State" 
                    value={input.state}
                    disabled={!pincodeValid}
                  />
                )}
                {errors.state && <span className="error">{errors.state}</span>}
              </Col>
            </Row>
            
            {showPaymentSection && (
              <div className="container mt-4">
                <div style={{ marginLeft: "-5%" }}>
                  <h5 className={theme === "darkTheme" ? "text-light" : "text-dark"}>Payment</h5>
                  <p className={theme === "darkTheme" ? "text-light" : "text-dark"}>All transactions are secure and encrypted.</p>
                  <div style={{ border: `1px solid ${theme === "darkTheme" ? "#495057" : "#dee2e6"}` }}>
                    <div style={{ borderBottom: `1px solid ${theme === "darkTheme" ? "#495057" : "#dee2e6"}` }} className={`form-check p-2 ${paymentMethod === 'Prepaid' ? 'background-radio' : ''}`}>
                      <input
                        className="form-check-input ms-1 me-2"
                        type="radio"
                        name="paymentMethod"
                        value="Prepaid"
                        checked={paymentMethod === 'Prepaid'}
                        onChange={handlePaymentChange}
                        id="prepaid"
                      />
                      <label className={`form-check-label d-flex align-items-center ${theme === "darkTheme" ? "text-light" : "text-dark"}`} htmlFor="prepaid">
                        <span>Prepaid Payment (UPI, Cards, Wallets, NetBanking)</span>
                      </label>
                    </div>
                    <div className={`form-check p-2 ${paymentMethod === 'COD' ? 'background-radio' : ''}`}>
                      <input
                        className="form-check-input ms-1 me-2"
                        type="radio"
                        name="paymentMethod"
                        value="COD"
                        checked={paymentMethod === 'COD'}
                        onChange={handlePaymentChange}
                        id="cod"
                      />
                      <label className={`form-check-label ${theme === "darkTheme" ? "text-light" : "text-dark"}`} htmlFor="cod">
                        Cash on Delivery (COD)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Col>
        
        <Col className='over-right' sm={12} lg={6}>
          <div className="rightSide">
            <h2 className={theme === "darkTheme" ? "text-light" : "text-dark"}>Your cart</h2>
            <div className="cart-items1">
              
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} src={item.productImages[0].url} alt="image" />
                  <div className="item-details">
                    <span className={theme === "darkTheme" ? "text-light" : "text-dark"}>{item.productName}</span>
                    {item?.selectedVariant && (
                 <>
                   <span className={theme === "darkTheme" ? "text-light" : "text-dark"}>
                    {item.selectedVariant.name}: {item.selectedVariant.value}
                    </span>
                     <span className={theme === "darkTheme" ? "text-light" : "text-dark"}>
                      Rs. {item.selectedVariant.price}
                    </span>
                  </>
)}
                    <p className={theme === "darkTheme" ? "text-light" : "text-dark"}>Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="container">
              <table className={`table ${theme === "darkTheme" ? "table-dark" : ""}`}>
                <tbody>
                  <tr>
                    <th scope="row">Subtotal</th>
                    <td>₹{getTotal()}</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Shipping</span>
                      </div>
                    </th>
                    <td>{paymentMethod === "COD" ? "₹100 (COD charges)" : "Free"}</td>
                  </tr>
                  <tr>
                    <th scope="row">Total
                      <p>Including ₹{Math.round(totalAmount * 0.18)} in taxes</p>
                    </th>
                    <td>
                      <strong>₹{totalAmount}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Col>
        
        <Col sm={12} lg={6}>
          <button 
            type="submit" 
            style={{ width: "95%" }} 
            onClick={handleSubmit} 
            className="checkout-btn btn mt-3" 
            disabled={loading || !pincodeValid || !showPaymentSection}
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default CheckOut;