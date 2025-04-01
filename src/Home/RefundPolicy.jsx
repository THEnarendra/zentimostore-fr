import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './RefundPolicy.css';

const RefundPolicy = () => {
  return (
    <Container className="refund-container">
      <Row className="refund-row">
        <Col md={10} className="refund-col">
          <div className="refund-header">
            <h2>Refund & Cancellation Policy</h2>
            <p className="refund-subheader">Last Updated: March 2023</p>
          </div>
          
          <div className="refund-notice">
            <h4>Important Notice:</h4>
            <p>
              All refund requests require video evidence within 24 hours of delivery. 
              No returns will be accepted without proper documentation.
            </p>
          </div>

          <section className="refund-section">
            <h3>1. Returns & Refunds</h3>
            <p>
              We accept returns only under these conditions:
            </p>
            <ul>
              <li>
                <strong>Damaged Product:</strong> You must share an unboxing video and photographs clearly showing the damage 
                within 24 hours of delivery via WhatsApp (+91 7014146550) or email (framerang@gmail.com).
              </li>
              <li>
                <strong>Wrong Product:</strong> Video evidence showing the received item vs ordered item must be shared within 24 hours.
              </li>
            </ul>
          </section>

          <section className="refund-section">
            <h3>2. Non-Returnable Items</h3>
            <ul>
              <li>Customized/personalized photo frames</li>
              <li>Products without original packaging</li>
              <li>Items reported after 24 hours of delivery</li>
            </ul>
          </section>

          <section className="refund-section">
            <h3>3. Cancellation Policy</h3>
            <div className="refund-alert">
              <h5>Before Dispatch:</h5>
              <p>Full refund will be processed if cancelled before shipment.</p>
              
              <h5>After Dispatch:</h5>
              <p>
                You will bear the actual shipping charges incurred. 
                The remaining amount will be refunded after deducting:
              </p>
              <ul>
                <li>Forward shipping charges</li>
                <li>Return shipping charges (if applicable)</li>
              </ul>
            </div>
          </section>

          <section className="refund-section">
            <h3>4. Refund Processing Time</h3>
            <table className="refund-table">
              <thead>
                <tr>
                  <th>Payment Method</th>
                  <th>Processing Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Credit/Debit Cards</td>
                  <td>5-7 business days</td>
                </tr>
                <tr>
                  <td>UPI</td>
                  <td>3-5 business days</td>
                </tr>
                <tr>
                  <td>Net Banking</td>
                  <td>3-5 business days</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="refund-section">
            <h3>5. Contact Us</h3>
            <p>
              For return requests or questions:
            </p>
            <ul>
              <li><strong>WhatsApp:</strong> +91 7014146550</li>
              <li><strong>Email:</strong> framerang@gmail.com</li>
              <li><strong>Business Hours:</strong> Mon-Sat, 10AM-7PM IST</li>
            </ul>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default RefundPolicy;