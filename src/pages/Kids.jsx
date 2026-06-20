import React from 'react';
import { Link } from 'react-router-dom';
import './Kids.css';

const Kids = () => {
  return (
    <div className="kids-page">
      {/* Kids' Hero Section */}
      <section className="kids-hero">
        <div className="kids-hero-container">
          <div className="kids-hero-content">
            <div className="kids-hero-badge">
              <span className="kids-badge-text">Kids Collection 2025</span>
            </div>
            
            <h1 className="kids-hero-title">
              Fun & Colorful
              <span className="kids-hero-highlight"> Kids Fashion</span>
            </h1>
            
            <p className="kids-hero-description">
              Discover our playful and comfortable clothing collection designed for active kids 
              who love to explore, play, and express their unique personalities.
            </p>
            
            <div className="kids-hero-features">
              <div className="kids-feature-item">
                <div className="kids-feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                  </svg>
                </div>
                <span className="kids-feature-text">Safe Materials</span>
              </div>
              <div className="kids-feature-item">
                <div className="kids-feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="kids-feature-text">Durable Quality</span>
              </div>
              <div className="kids-feature-item">
                <div className="kids-feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="kids-feature-text">Fun Designs</span>
              </div>
            </div>
            
            <div className="kids-hero-buttons">
              <Link to="/kids/boys" className="kids-btn-primary">
                Shop Kids Collection
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/size-guide" className="kids-btn-secondary">
                Size Chart
              </Link>
            </div>
          </div>

          {/* Kids' Hero Visual */}
          <div className="kids-hero-visual">
            <img 
              src="https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Kids Fashion"
              className="kids-hero-img"
            />
          </div>
        </div>
        
        {/* Kids' hero background decoration */}
        <div className="kids-hero-decoration">
          <div className="kids-decoration-shape kids-shape-1"></div>
          <div className="kids-decoration-shape kids-shape-2"></div>
          <div className="kids-decoration-shape kids-shape-3"></div>
          <div className="kids-decoration-shape kids-shape-4"></div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="kids-categories">
        <div className="container">
          <h2 className="kids-section-title">Shop Kids Categories</h2>
          <div className="kids-categories-grid">
            <Link to="/kids/boys" className="kids-category-item">
              <div className="kids-category-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M6 2l3 6v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V8l3-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 2v2M18 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="kids-category-title">Boys</h3>
              <p className="kids-category-desc">Cool and comfortable outfits for boys</p>
            </Link>
            
            <Link to="/kids/girls" className="kids-category-item">
              <div className="kids-category-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="kids-category-title">Girls</h3>
              <p className="kids-category-desc">Beautiful and fun clothing for girls</p>
            </Link>
            
            <Link to="/kids/babies" className="kids-category-item">
              <div className="kids-category-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 12c-2 0-4 1-4 3v2h16v-2c0-2-2-3-4-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="kids-category-title">Babies</h3>
              <p className="kids-category-desc">Soft and gentle clothing for babies</p>
            </Link>
            
          
            
           
          </div>
        </div>
      </section>
    </div>
  );
};

export default Kids;
