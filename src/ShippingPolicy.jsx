import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './ShippingPolicy.css'; // We'll create this CSS file

const ShippingPolicy = () => {
  return (
    <Container className="shipping-container">
      <Row className="justify-content-center">
        <Col md={10} className="shipping-content">
          <div className="shipping-header">
            <h2>Shipping & Delivery Policy</h2>
            <p className="effective-date">Effective from March 2023</p>
          </div>

          <div className="shipping-highlight-box">
            <h4>Key Information:</h4>
            <ul>
              <li>All orders shipped within <strong>2 business days</strong></li>
              <li>Delivery within <strong>5-6 business days</strong> across India</li>
              <li>100% safe delivery through our trusted partners</li>
              <li>Real-time tracking provided for all orders</li>
            </ul>
          </div>

          <section className="policy-section">
            <h3>1. Order Processing</h3>
            <p>
              We process all orders within <strong>48 hours</strong> of payment confirmation. Orders placed on weekends or holidays will be processed on the next business day.
            </p>
          </section>

          <section className="policy-section">
            <h3>2. Shipping Partners</h3>
            <p>
              We work exclusively with trusted logistics partners including:
            </p>
            <ul>
              <li>Delhivery</li>
              <li>DTDC</li>
              <li>FedEx</li>
              <li>XpressBees</li>
            </ul>
            <p>
              All packages are handled with care and include protective packaging for your photo frames and posters.
            </p>
          </section>

          <section className="policy-section">
            <h3>3. Delivery Timeline</h3>
            <div className="timeline-box">
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h5>Day 1-2:</h5>
                  <p>Order processing and dispatch from our warehouse</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h5>Day 3-5:</h5>
                  <p>In transit to your nearest hub</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h5>Day 5-6:</h5>
                  <p>Final delivery to your address</p>
                </div>
              </div>
            </div>
            <p className="note-text">
              *Delivery may take 1-2 extra days for remote locations
            </p>
          </section>

          <section className="policy-section">
            <h3>4. Tracking Your Order</h3>
            <p>
              You'll receive a tracking number via SMS and email once your order is dispatched. Use our <a href="/track-order" className="tracking-link">Order Tracker</a> or the courier company's website to monitor your package in real-time.
            </p>
          </section>

          <section className="policy-section">
            <h3>5. International Shipping</h3>
            <p>
              Currently we only ship within India. We're working to expand our services internationally soon.
            </p>
          </section>

          <section className="policy-section">
            <h3>6. Contact & Support</h3>
            <p>
              For any shipping inquiries:
            </p>
            <ul className="contact-list">
              <li><strong>Email:</strong> framerang@gmail.com</li>
              <li><strong>WhatsApp:</strong> +91 7014146550</li>
              <li><strong>Hours:</strong> Mon-Sat, 10AM-7PM IST</li>
            </ul>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingPolicy;