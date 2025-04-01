import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './TermsOfService.css'; // We'll create this CSS file

const TermsOfService = () => {
  return (
    <div className="tos-container">
      <Row className="justify-content-center">
        <Col md={10} className="tos-content">
          <div className="tos-header">
            <h1>Terms of Service</h1>
            <p className="effective-date">Last Updated: March 2023</p>
          </div>

          <div className="notice-box">
            <p>
              <strong>Important:</strong> By accessing or using Zentimo Store's services, you agree to be bound by these terms. Please read them carefully.
            </p>
          </div>

          <section className="tos-section">
            <h2>1. General Terms</h2>
            <p>
              These Terms of Service ("Terms") govern your use of Zentimo Store's website (framerang.com) and services for purchasing photo frames and posters. By placing an order, you agree to these Terms.
            </p>
          </section>

          <section className="tos-section">
            <h2>2. Account Registration</h2>
            <p>
              To place orders, you may need to create an account. You agree to:
            </p>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your password</li>
              <li>Be responsible for all activities under your account</li>
              <li>Not create multiple accounts for misuse</li>
            </ul>
          </section>

          <section className="tos-section">
            <h2>3. Ordering & Payments</h2>
            <p>
              All orders are subject to product availability. By placing an order, you:
            </p>
            <ul>
              <li>Agree to pay the full amount including taxes and shipping</li>
              <li>Authorize us to charge your payment method</li>
              <li>Understand that prices may change without notice</li>
            </ul>
            <p>
              We process payments through secure gateway's. While we store transaction records for order processing, 
              we <strong>do not store</strong> your full credit card details or sensitive payment information.
            </p>
          </section>

          <section className="tos-section">
            <h2>4. Shipping & Delivery</h2>
            <p>
              Please refer to our separate <a href="/shipping-policy" className="policy-link">Shipping Policy</a> for details. Key points:
            </p>
            <ul>
              <li>Orders ship within 2 business days</li>
              <li>Delivery typically takes 5-6 business days</li>
              <li>You are responsible for providing accurate shipping information</li>
            </ul>
          </section>

          <section className="tos-section">
            <h2>5. Returns & Refunds</h2>
            <p>
              Our <a href="/refund-policy" className="policy-link">Refund Policy</a> applies to all purchases. Key conditions:
            </p>
            <ul>
              <li>Returns accepted within 24 hours of delivery with video proof</li>
              <li>Only for damaged or wrong items</li>
              <li>Customized items cannot be returned</li>
            </ul>
          </section>

          <section className="tos-section">
            <h2>6. Intellectual Property</h2>
            <p>
              All content on framerang.com, including designs, text, and images are our property. You agree not to:
            </p>
            <ul>
              <li>Copy, modify, or distribute our content</li>
              <li>Use our designs for commercial purposes</li>
              <li>Reverse engineer any part of our service</li>
            </ul>
          </section>

          <section className="tos-section">
            <h2>7. Prohibited Conduct</h2>
            <p>
              You may not:
            </p>
            <ul>
              <li>Use our service for illegal purposes</li>
              <li>Upload harmful or offensive content</li>
              <li>Interfere with our website's operation</li>
              <li>Attempt to gain unauthorized access</li>
            </ul>
          </section>

          <section className="tos-section">
            <h2>8. Limitation of Liability</h2>
            <p>
              Zentimo Store shall not be liable for:
            </p>
            <ul>
              <li>Any indirect, incidental, or consequential damages</li>
              <li>Errors in product descriptions or pricing</li>
              <li>Delivery delays beyond our control</li>
            </ul>
          </section>

          <section className="tos-section">
            <h2>9. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time. Continued use after changes constitutes acceptance.
            </p>
          </section>

          <section className="tos-section">
            <h2>10. Governing Law</h2>
            <p>
              These Terms are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts in [Your City], India.
            </p>
          </section>

          <section className="tos-section">
            <h2>11. Contact Us</h2>
            <p>
              For questions about these Terms:
            </p>
            <address>
              <strong>Zentimo Store</strong><br />
              Email: <a href="mailto:framerang@gmail.com" className="policy-link">framerang@gmail.com</a><br />
              Phone: <a href="tel:+917014146550" className="policy-link">+91 7014146550</a><br />
              Business Hours: Mon-Sat, 10AM-7PM IST
            </address>
          </section>
        </Col>
      </Row>
    </div>
  );
};

export default TermsOfService;