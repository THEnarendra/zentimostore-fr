import React from 'react';
import { motion } from 'framer-motion';
import { Row, Col } from 'react-bootstrap';
import './PolicyPage.css';

const PolicyPage = () => {
  return (
    <div className="privacy-policy-container">
      <Row>
        <Col md={12}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="policy-header"
          >
            <h1>Our Privacy Commitment at Zentimo Store</h1>
            <p className="lead">
              We value your trust as much as we value the memories you preserve with our frames
            </p>
          </motion.div>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={12}>
          {/* Section 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="policy-section"
          >
            <h2 className="policy-heading">1. Understanding Our Policy</h2>
            <div className="policy-content">
              <p>
                At Zentimo Store, we believe in transparency. This policy explains in simple terms how we handle your personal information when you:
              </p>
              <ul>
                <li><strong>Browse</strong> our collection of photo frames and posters</li>
                <li><strong>Make purchases</strong> on our website</li>
                <li><strong>Contact</strong> our customer support</li>
                <li><strong>Subscribe</strong> to our newsletters</li>
              </ul>
              <p>
                <strong>Effective Date:</strong> This policy was last updated on March 15, 2023 and applies to all visitors of framerang.com.
              </p>
            </div>
          </motion.div>

          {/* Section 2 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="policy-section"
          >
            <h2 className="policy-heading">2. Information We Collect</h2>
            <div className="policy-content">
              <p>
                We only collect what's necessary to provide you with the best service:
              </p>
              <div className="two-columns">
                <div className="column">
                  <h5 style={{ color: 'var(--accent-color)' }}>Basic Information</h5>
                  <ul>
                    <li><strong>Name:</strong> To personalize your experience</li>
                    <li><strong>Contact Details:</strong> For order updates and delivery</li>
                    <li><strong>Address:</strong> To ensure your frames reach you safely</li>
                  </ul>
                </div>
                <div className="column">
                  <h5 style={{ color: 'var(--accent-color)' }}>Technical Information</h5>
                  <ul>
                    <li><strong>Device Data:</strong> To optimize our website</li>
                    <li><strong>IP Address:</strong> For security purposes</li>
                    <li><strong>Cookies:</strong> To remember preferences</li>
                  </ul>
                </div>
              </div>
              <p className="note-text">
                <em>Note:</em> We never store payment details. All payments are processed through Payment Gateways.
              </p>
            </div>
          </motion.div>

          {/* Section 3 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="policy-section"
          >
            <h2 className="policy-heading">3. How We Use Your Information</h2>
            <div className="policy-content">
              <p>
                Every piece of information serves a purpose to enhance your experience:
              </p>
              <div className="two-columns">
                <div className="column">
                  <div className="numbered-item">
                    <div className="number-circle">1</div>
                    <h5 style={{ margin: 0 }}>Order Processing</h5>
                  </div>
                  <p>Manage your account and process payments</p>
                  
                  <div className="numbered-item">
                    <div className="number-circle">2</div>
                    <h5 style={{ margin: 0 }}>Customer Support</h5>
                  </div>
                  <p>Respond to your queries promptly</p>
                </div>
                <div className="column">
                  <div className="numbered-item">
                    <div className="number-circle">3</div>
                    <h5 style={{ margin: 0 }}>Improvements</h5>
                  </div>
                  <p>Analyze usage to enhance services</p>
                  
                  <div className="numbered-item">
                    <div className="number-circle">4</div>
                    <h5 style={{ margin: 0 }}>Security</h5>
                  </div>
                  <p>Protect against fraudulent activity</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 4 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="policy-section"
          >
            <h2 className="policy-heading">4. Data Security Measures</h2>
            <div className="policy-content">
              <p>
                We protect your memories and your data with:
              </p>
              <ul>
                <li><strong>HTTPS Encryption:</strong> Secure connections throughout</li>
                <li><strong>Razorpay Integration:</strong> PCI-compliant payments</li>
                <li><strong>Access Controls:</strong> Limited employee access</li>
                <li><strong>Regular Audits:</strong> Continuous security reviews</li>
              </ul>
              <p className="note-text">
                Remember to use strong passwords and keep login details private.
              </p>
            </div>
          </motion.div>

          {/* Section 5 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="policy-section"
          >
            <h2 className="policy-heading">5. Your Privacy Rights</h2>
            <div className="policy-content">
              <p>
                You control your personal information:
              </p>
              <div className="two-columns">
                <div className="column">
                  <div className="info-card">
                    <h5>Access & Correction</h5>
                    <p>View or update your information anytime</p>
                  </div>
                  <div className="info-card">
                    <h5>Marketing Preferences</h5>
                    <p>Unsubscribe from emails with one click</p>
                  </div>
                </div>
                <div className="column">
                  <div className="info-card">
                    <h5>Data Deletion</h5>
                    <p>Request removal of your personal data</p>
                  </div>
                  <div className="info-card">
                    <h5>Cookies</h5>
                    <p>Manage through your browser settings</p>
                  </div>
                </div>
              </div>
              <p>
                Contact us at <a href="mailto:framerang@gmail.com" className="policy-link">framerang@gmail.com</a> or call <a href="tel:+917014149550" className="policy-link">+91 7014149550</a> to exercise these rights.
              </p>
            </div>
          </motion.div>

          {/* Section 6 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="policy-section"
          >
            <h2 className="policy-heading">6. Contact Us</h2>
            <div className="policy-content">
              <div className="contact-section">
                <div className="contact-column">
                  <h5>Zentimo Store</h5>
                  <p>
                    <strong>Owner:</strong> Savita Kumawat<br />
                    <strong>Email:</strong> <a href="framerang@gmail.com" className="policy-link">framerang@gmail.com</a><br />
                    <strong>Phone:</strong> <a href="tel:+917014146550" className="policy-link">+91 7014146550</a><br />
                    <strong>Hours:</strong> Mon-Sat, 10AM-7PM IST
                  </p>
                </div>
                <div className="contact-column">
                  <h5>Grievance Officer</h5>
                  <p>
                    As required by Indian IT Act:<br />
                    Savita Kumawat<br />
                    Email: <a href="mailto:framerang@gmail.com" className="policy-link">framerang@gmail.com</a>
                  </p>
                </div>
              </div>
              <p className="note-text">
                We respond to privacy inquiries within 48 hours. For urgent matters, please call.
              </p>
            </div>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
};

export default PolicyPage;