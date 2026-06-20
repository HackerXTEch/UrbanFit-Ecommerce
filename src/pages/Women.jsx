import React from 'react';
import { Link } from 'react-router-dom';
import './Women.css';

const Women = () => {
  return (
    <div className="women-page">
      {/* Women's Hero Section */}
      <section className="women-hero">
        <div className="women-hero-container">
          <div className="women-hero-content">
            <div className="women-hero-badge">
              <span className="women-badge-text">Women's Collection 2025</span>
            </div>
            
            <h1 className="women-hero-title">
              Embrace Your
              <span className="women-hero-highlight"> Feminine Power</span>
            </h1>
            
            <p className="women-hero-description">
              From elegant business attire to casual weekend wear, discover our curated 
              collection designed for the modern woman who knows what she wants.
            </p>
            
            <div className="women-hero-features">
              <div className="women-feature-item">
                <div className="women-feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                  </svg>
                </div>
                <span className="women-feature-text">Premium Quality</span>
              </div>
              <div className="women-feature-item">
                <div className="women-feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="women-feature-text">Ethical Fashion</span>
              </div>
              <div className="women-feature-item">
                <div className="women-feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="women-feature-text">Free Returns</span>
              </div>
            </div>
            
            <div className="women-hero-buttons">
              <Link to="/women/casual-wear" className="women-btn-primary">
                Shop Women's Collection
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/size-guide" className="women-btn-secondary">
                Size Guide
              </Link>
            </div>
          </div>

          {/* Women's Hero Visual */}
          <div className="women-hero-visual">
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Women's Fashion"
              className="women-hero-img"
            />
          </div>
        </div>
        
        {/* Women's hero background decoration */}
        <div className="women-hero-decoration">
          <div className="women-decoration-circle women-circle-1"></div>
          <div className="women-decoration-circle women-circle-2"></div>
          <div className="women-decoration-lines">
            <div className="women-line"></div>
            <div className="women-line"></div>
            <div className="women-line"></div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="women-categories">
        <div className="container">
          <h2 className="women-section-title">Shop Women's Categories</h2>
          <div className="women-categories-grid">
            <Link to="/women/professional" className="women-category-item">
              <div className="women-category-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M6 2l3 6v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V8l3-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 2v2M18 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="women-category-title">Professional</h3>
              <p className="women-category-desc">Blazers, skirts, and office essentials</p>
            </Link>
            
            <Link to="/women/evening-wear" className="women-category-item">
              <div className="women-category-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="women-category-title">Evening Wear</h3>
              <p className="women-category-desc">Elegant dresses for special occasions</p>
            </Link>
            
            <Link to="/women/casual-wear" className="women-category-item">
              <div className="women-category-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="women-category-title">Casual</h3>
              <p className="women-category-desc">Comfortable everyday fashion</p>
            </Link>
            
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default Women;
