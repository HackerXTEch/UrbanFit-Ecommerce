import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* About Hero Section */}
      <section className="about-hero">
        <div className="about-hero-container">
          <div className="about-hero-content">
            <div className="about-hero-badge">
              <span className="about-badge-text">Our Story</span>
            </div>
            
            <h1 className="about-hero-title">
              Welcome to
              <span className="about-hero-highlight"> UrbanFit</span>
            </h1>
            
            <p className="about-hero-description">
              Founded in 2020, UrbanFit has been revolutionizing fashion by bringing together 
              style, comfort, and sustainability. We believe that great fashion should be accessible 
              to everyone, regardless of age, gender, or lifestyle.
            </p>
            
            <div className="about-hero-stats">
              <div className="about-stat-item">
                <div className="about-stat-number">100K+</div>
                <div className="about-stat-label">Happy Customers</div>
              </div>
              <div className="about-stat-item">
                <div className="about-stat-number">5000+</div>
                <div className="about-stat-label">Products</div>
              </div>
              <div className="about-stat-item">
                <div className="about-stat-number">50+</div>
                <div className="about-stat-label">Countries</div>
              </div>
            </div>
            
            <div className="about-hero-buttons">
              <Link to="/sale" className="about-btn-primary">
                Shop Sale
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/contact" className="about-btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>

          {/* About Hero Visual */}
          <div className="about-hero-visual">
            <div className="about-hero-image-container">
              <div className="about-hero-main-image">
                <img 
                  src="https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_1280.jpg" 
                  alt="UrbanFit Store"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '30px'
                  }}
                />
              </div>
              
              {/* Floating value cards */}
              <div className="about-floating-card about-card-1">
                <div className="about-card-content">
                  <div className="about-card-icon">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="about-card-text">
                    <span className="about-card-title">Quality First</span>
                    <span className="about-card-desc">Premium materials</span>
                  </div>
                </div>
              </div>
              
              <div className="about-floating-card about-card-2">
                <div className="about-card-content">
                  <div className="about-card-icon">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="about-card-text">
                    <span className="about-card-title">Sustainable</span>
                    <span className="about-card-desc">Eco-friendly fashion</span>
                  </div>
                </div>
              </div>
              
              <div className="about-floating-card about-card-3">
                <div className="about-card-content">
                  <div className="about-card-icon">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="about-card-text">
                    <span className="about-card-title">Customer Focus</span>
                    <span className="about-card-desc">You come first</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="about-mission">
        <div className="container">
          <h2 className="about-section-title">Our Mission</h2>
          <div className="mission-content">
            <div className="mission-text">
              <p>
                At UrbanFit, we're more than just a clothing brand. We're a movement towards 
                sustainable, inclusive, and accessible fashion. Our mission is to empower 
                individuals to express their unique style while making conscious choices that 
                benefit both people and the planet.
              </p>
              <p>
                We believe that fashion should be a force for good, which is why we're committed 
                to ethical manufacturing, sustainable materials, and fair labor practices. 
                Every piece in our collection is designed with care, crafted with purpose, 
                and created to last.
              </p>
            </div>
            <div className="mission-image">
              <img 
                src="https://cdn.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg" 
                alt="Sustainable Fashion"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="about-values">
        <div className="container">
          <h2 className="about-section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="value-title">Excellence</h3>
              <p className="value-desc">We strive for perfection in every piece we create</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="value-title">Inclusivity</h3>
              <p className="value-desc">Fashion for everyone, regardless of size, age, or style</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="value-title">Sustainability</h3>
              <p className="value-desc">Committed to protecting our planet for future generations</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="value-title">Innovation</h3>
              <p className="value-desc">Constantly evolving to meet the needs of modern fashion</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="about-team">
        <div className="container">
          <h2 className="about-section-title">Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="50" fill="#2D898B" fillOpacity="0.2"/>
                  <circle cx="50" cy="35" r="15" fill="#2D898B" fillOpacity="0.7"/>
                  <path d="M25 75 Q25 60, 50 60 Q75 60, 75 75" fill="#2D898B" fillOpacity="0.7"/>
                </svg>
              </div>
              <h4 className="member-name">Sarah Johnson</h4>
              <p className="member-role">CEO & Founder</p>
              <p className="member-bio">Fashion visionary with 15+ years in sustainable design</p>
            </div>
            
            <div className="team-member">
              <div className="member-avatar">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="50" fill="#e74c3c" fillOpacity="0.2"/>
                  <circle cx="50" cy="35" r="15" fill="#e74c3c" fillOpacity="0.7"/>
                  <path d="M25 75 Q25 60, 50 60 Q75 60, 75 75" fill="#e74c3c" fillOpacity="0.7"/>
                </svg>
              </div>
              <h4 className="member-name">Marcus Chen</h4>
              <p className="member-role">Creative Director</p>
              <p className="member-bio">Award-winning designer passionate about innovative fashion</p>
            </div>
            
            <div className="team-member">
              <div className="member-avatar">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="50" fill="#ffc107" fillOpacity="0.2"/>
                  <circle cx="50" cy="35" r="15" fill="#ffc107" fillOpacity="0.7"/>
                  <path d="M25 75 Q25 60, 50 60 Q75 60, 75 75" fill="#ffc107" fillOpacity="0.7"/>
                </svg>
              </div>
              <h4 className="member-name">Emily Rodriguez</h4>
              <p className="member-role">Head of Sustainability</p>
              <p className="member-bio">Environmental advocate driving our eco-friendly initiatives</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
