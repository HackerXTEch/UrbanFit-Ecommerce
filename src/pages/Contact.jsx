import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Animated Background */}
      <div className="contact-background">
        <div className="animated-circles">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
          <div className="circle circle-4"></div>
          <div className="circle circle-5"></div>
        </div>
        
        <div className="animated-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        <div className="floating-icons">
          <div className="icon-wrapper icon-1">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="currentColor"/>
            </svg>
          </div>
          <div className="icon-wrapper icon-2">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
              <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="icon-wrapper icon-3">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="currentColor"/>
              <circle cx="12" cy="10" r="3" fill="white"/>
            </svg>
          </div>
          <div className="icon-wrapper icon-4">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Brand Header */}
      <div className="contact-brand">
        <h1>Contact Us</h1>
        <p>We'd Love To Hear From You</p>
      </div>

      {/* Contact Card */}
      <div className="contact-card">
        <div className="contact-grid">
          {/* Contact Info Cards */}
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="currentColor"/>
                </svg>
              </div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Email</h3>
              <p>support@urbanfit.com</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="currentColor"/>
                  <circle cx="12" cy="10" r="3" fill="white"/>
                </svg>
              </div>
              <h3>Address</h3>
              <p>123 Fashion Street<br/>New York, NY 10001</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container">
            <h2>Send Us A Message</h2>
            <form className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="your@email.com" required />
                </div>
              </div>
              
              <div className="form-group">
                <label>Subject</label>
                <input type="text" placeholder="How can we help?" required />
              </div>
              
              <div className="form-group">
                <label>Message</label>
                <textarea rows="5" placeholder="Your message..." required></textarea>
              </div>
              
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
