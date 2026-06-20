import React from 'react';
import { Link } from 'react-router-dom';
import './Men.css';

const Men = () => {
  return (
    <div className="men-page">
      {/* Men's Hero Section */}
      <section className="men-hero">
        <div className="men-hero-container">
          <div className="men-hero-content">
            <div className="men-hero-badge">
              <span className="men-badge-text">Men's Collection 2025</span>
            </div>
            
            <h1 className="men-hero-title">
              Redefine Your
              <span className="men-hero-highlight"> Masculine Style</span>
            </h1>
            
            <p className="men-hero-description">
              From sharp business attire to casual streetwear, discover our premium 
              collection designed for the modern man who values both style and comfort.
            </p>
            
            <div className="men-hero-features">
              <div className="men-feature-item">
                <div className="men-feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                  </svg>
                </div>
                <span className="men-feature-text">Premium Quality</span>
              </div>
              <div className="men-feature-item">
                <div className="men-feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="men-feature-text">Lifetime Warranty</span>
              </div>
              <div className="men-feature-item">
                <div className="men-feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="men-feature-text">Free Shipping</span>
              </div>
            </div>
            
            <div className="men-hero-buttons">
              <Link to="/men/casual-wear" className="men-btn-primary">
                Shop Men's Collection
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/size-guide" className="men-btn-secondary">
                View Size Guide
              </Link>
            </div>
          </div>

          {/* Men's Hero Visual */}
          <div className="men-hero-visual">
            <img 
              src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Men's Fashion"
              className="men-hero-img"
            />
          </div>
        </div>
        
        {/* Men's hero background decoration */}
        <div className="men-hero-decoration">
          <div className="men-decoration-circle men-circle-1"></div>
          <div className="men-decoration-circle men-circle-2"></div>
          <div className="men-decoration-lines">
            <div className="men-line"></div>
            <div className="men-line"></div>
            <div className="men-line"></div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="men-categories">
        <div className="container">
          <h2 className="men-section-title">Shop Men's Categories</h2>
          <div className="men-categories-grid">
            <Link to="/men/formal-wear" className="men-category-item">
              <div className="men-category-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M6 2l3 6v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V8l3-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 2v2M18 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="men-category-title">Formal Wear</h3>
              <p className="men-category-desc">Suits, dress shirts, and formal accessories</p>
            </Link>
            
            <Link to="/men/casual-wear" className="men-category-item">
              <div className="men-category-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="men-category-title">Casual Wear</h3>
              <p className="men-category-desc">T-shirts, jeans, and everyday essentials</p>
            </Link>
            
            <Link to="/men/sportswear" className="men-category-item">
              <div className="men-category-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M2 18h20l-2-7H4l-2 7zM7 4V2a2 2 0 0 1 4 0v2M17 4V2a2 2 0 0 1 4 0v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="men-category-title">Sportswear</h3>
              <p className="men-category-desc">Athletic wear and gym essentials</p>
            </Link>
            
           
          </div>
        </div>
      </section>
    </div>
  );
};

export default Men;