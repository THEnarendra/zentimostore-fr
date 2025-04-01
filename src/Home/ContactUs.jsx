import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import '../MainCss/ContactUs.css'
import logo from "../images/2.png"
import { toast, Toaster } from "react-hot-toast";
import Loader from '../Components/Loader/Loader';
const ContactUs = ({ setFooter }) => {
  setFooter(false)
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const validation = () => {
    let error = {};
    if (!firstname) error.firstname = "! Please enter First name";
    if (!lastname) error.lastname = "! Please enter Last name";
    if (!phone) { error.phone = "! Please enter Phone number"; }
    else if (!/^[9876]\d{9}$/.test(phone)) {
      error.phone = "! Phone number must be 10 digits and start with 9, 8, 7, or 6";
    }
    if (!email) {
      error.email = "! Please enter Email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      error.email = "! Email address is invalid";
    }
    if (!query) error.query = "! Please enter your query";
    setErrors(error);
    return Object.keys(error).length === 0;
  };
  const data = {
    "name": firstname + lastname,
    "email": email,
    "message": query
  }
  useEffect(() => {
    if (loading) {
      document.body.style.opacity = '0.5';
      document.body.style.pointerEvents = 'none';
    } else {
      document.body.style.opacity = '1';
      document.body.style.pointerEvents = 'auto';
    }
  }, [loading])
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation()) {
      setLoading(true)
      const response = await fetch(`${process.env.REACT_APP_API_URL}/contactUs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        setLoading(false)
        toast.success("Network response was not ok");
        throw new Error('Network response was not ok');
      }
      setEmail("")
      setFirstname("")
      setLastname("")
      setPhone("")
      setQuery("")
      setLoading(false)
      toast.success("Form Submit Succesfull");
    }
  };
  const phonenumer = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhone(value);
    }
  };
  return (
    <>
      {loading && <div className="overlay"><Loader /></div>}
      <Toaster />
      <Row style={{ marginBottom: 150 }} className='row '>
        <Col sm={12} lg={6} className='col1 mt-4'>
          <form className="row g-3">
            <h1>Contact Us</h1>
            <img style={{ width: "150px" }} src={logo} alt="image" />
            <p>Hey we are framerang providing high quality picture fraems for you and your family your will find very high wqualtiyte </p>
            <span>Headquaters</span>
            <p>Lalchandpura kumawato ki dhani</p>
          </form>
        </Col>
        <Col sm={12} lg={6} className='col2'>
          <form className="row" onSubmit={handleSubmit}>
            <p>Please allow 1-2 business days to respond to your inquiry.</p>
            <h2>Let's connect</h2>
            <div className="col-md-6">
              <label htmlFor="inputFirstname" className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                id="inputFirstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              {errors.firstname && <span className="error text-danger">{errors.firstname}</span>}
            </div>
            <div className="col-md-6">
              <label htmlFor="inputLastname" className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="inputLastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              {errors.lastname && <span className="error text-danger">{errors.lastname}</span>}
            </div>
            <div className="col-md-6 mt-2">
              <label htmlFor="inputEmail" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="xyz@gmail.com"
              />
              {errors.email && <span className="error text-danger">{errors.email}</span>}
            </div>
            <div className="col-md-6 mt-2">
              <label htmlFor="inputPhone" className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="inputPhone"
                value={phone}
                onChange={(e) => phonenumer(e)}
              />
              {errors.phone && <span className="error text-danger">{errors.phone}</span>}
            </div>
            <div className="col-md-12 mt-2">
              <label htmlFor="inputQuery" className="form-label">What is your query?</label>
              <input
                type="text"
                className="form-control"
                id="inputQuery"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {errors.query && <span className="error text-danger">{errors.query}</span>}
            </div>
            <div className="col-12 mt-4">
              <button type="submit" className="btn ">Submit</button>
            </div>
          </form>
        </Col>
      </Row>
    </>
  )
}
export default ContactUs
