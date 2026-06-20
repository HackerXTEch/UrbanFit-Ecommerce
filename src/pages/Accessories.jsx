import React from 'react';
import { Link } from 'react-router-dom';
import './Accessories.css';

const Accessories = () => {
  return (
    <div className="accessories-page">
      {/* Accessories Hero Section */}
      <section className="accessories-hero">
        <div className="accessories-hero-container">
          <div className="accessories-hero-content">
            <div className="accessories-hero-badge">
              <span className="accessories-badge-text">Complete Your Style</span>
            </div>
            
            <h1 className="accessories-hero-title">
              Fashion
              <span className="accessories-hero-highlight"> Accessories</span>
            </h1>
            
            <p className="accessories-hero-description">
              Discover our curated collection of premium accessories that add the perfect 
              finishing touch to your outfit. From statement jewelry to stylish bags.
            </p>
            
            <div className="accessories-hero-stats">
              <div className="accessories-stat-item">
                <div className="accessories-stat-number">500+</div>
                <div className="accessories-stat-label">Unique Items</div>
              </div>
              <div className="accessories-stat-item">
                <div className="accessories-stat-number">50+</div>
                <div className="accessories-stat-label">Top Brands</div>
              </div>
              <div className="accessories-stat-item">
                <div className="accessories-stat-number">24/7</div>
                <div className="accessories-stat-label">Support</div>
              </div>
            </div>
            
            <div className="accessories-hero-buttons">
              <Link to="/accessories" className="accessories-btn-primary">
                Shop Accessories
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/sale" className="accessories-btn-secondary">
                Sale Items
              </Link>
            </div>
          </div>

          {/* Accessories Hero Visual */}
          <div className="accessories-hero-visual">
            <img 
              src="https://images.unsplash.com/photo-1556306535-0f09a537f0a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Fashion Accessories"
              className="accessories-hero-img"
            />
          </div>
        </div>
        
        {/* Accessories hero background decoration */}
        <div className="accessories-hero-decoration">
          <div className="accessories-decoration-shape accessories-shape-1"></div>
          <div className="accessories-decoration-shape accessories-shape-2"></div>
          <div className="accessories-decoration-shape accessories-shape-3"></div>
          <div className="accessories-decoration-lines">
            <div className="accessories-line"></div>
            <div className="accessories-line"></div>
            <div className="accessories-line"></div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="accessories-categories">
        <div className="container">
          <h2 className="accessories-section-title">Accessory Categories</h2>
          <div className="accessories-categories-grid">
            <div className="accessories-category-item">
              <div className="accessories-category-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M6 2l3 6v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V8l3-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 2v2M18 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="accessories-category-title">Bags & Purses</h3>
              <p className="accessories-category-desc">Stylish handbags and clutches for every occasion</p>
            </div>
            
            <div className="accessories-category-item">
              <div className="accessories-category-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="accessories-category-title">Watches</h3>
              <p className="accessories-category-desc">Premium timepieces for the modern lifestyle</p>
            </div>
            
            <div className="accessories-category-item">
              <div className="accessories-category-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="accessories-category-title">Jewelry</h3>
              <p className="accessories-category-desc">Elegant necklaces, rings, and earrings</p>
            </div>
            
            <div className="accessories-category-item">
              <div className="accessories-category-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="accessories-category-title">Sunglasses</h3>
              <p className="accessories-category-desc">Stylish eyewear for sun protection</p>
            </div>
            
            <div className="accessories-category-item">
              <div className="accessories-category-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
                  <path d="M12 6c-3.31 0-6 2.69-6 6h2c0-2.21 1.79-4 4-4s4 1.79 4 4h2c0-3.31-2.69-6-6-6z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="accessories-category-title">Hats & Caps</h3>
              <p className="accessories-category-desc">Trendy headwear for every season</p>
            </div>
            
            <div className="accessories-category-item">
              <div className="accessories-category-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="accessories-category-title">Scarves</h3>
              <p className="accessories-category-desc">Cozy and fashionable scarves</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Accessories;
