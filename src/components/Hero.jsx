import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        {/* Hero Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">New Collection 2025</span>
          </div>
          
          <h1 className="hero-title">
            Elevate Your
            <span className="hero-highlight"> Urban Style</span>
          </h1>
          
          <p className="hero-description">
            Discover premium fashion that blends contemporary design with urban comfort. 
            Express your unique style with our carefully curated collection of clothing 
            and accessories.
          </p>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Premium Products</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Customer Support</span>
            </div>
          </div>
          
          <div className="hero-buttons">
            <button className="btn-primary">
              Shop Collection
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="btn-secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <polygon points="5,3 19,12 5,21" fill="currentColor"/>
              </svg>
              Watch Lookbook
            </button>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="hero-visual">
          <div className="hero-image-container">
            <div className="hero-image-main">
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Fashion Model"
                className="hero-main-img"
              />
              
              <div className="floating-card card-1">
                <div className="card-content">
                  <div className="card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="card-text">
                    <span className="card-title">Premium Quality</span>
                    <span className="card-subtitle">Certified Materials</span>
                  </div>
                </div>
              </div>
              
              <div className="floating-card card-2">
                <div className="card-content">
                  <div className="card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="card-text">
                    <span className="card-title">4.9★ Rating</span>
                    <span className="card-subtitle">2,500+ Reviews</span>
                  </div>
                </div>
              </div>
              
              <div className="floating-card card-3">
                <div className="card-content">
                  <div className="card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="card-text">
                    <span className="card-title">Free Delivery</span>
                    <span className="card-subtitle">Orders over $50</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background decorative elements */}
            <div className="hero-decoration">
              <div className="decoration-circle circle-1"></div>
              <div className="decoration-circle circle-2"></div>
              <div className="decoration-circle circle-3"></div>
              <div className="decoration-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-text">Scroll to explore</div>
        <div className="scroll-arrow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M7 13l3 3 3-3M7 6l3 3 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;