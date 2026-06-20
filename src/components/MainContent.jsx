import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatINR } from '../utils/currency';
import Hero from './Hero';
import './MainContent.css';

const MainContent = () => {
  const [showMenPreview, setShowMenPreview] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      const data = await getFeaturedProducts();
      setFeaturedProducts(data);
      setLoading(false);
    };
    fetchFeaturedProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.product_name,
      price: product.price,
      image: product.image
    });
  };

  const handleAddToWishlist = (product) => {
    addToWishlist({
      id: product.id,
      name: product.product_name,
      price: product.price,
      image: product.image
    });
  };

  const renderStars = (stars) => {
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  };

  return (
    <main className="main-content">
      {/* Hero Section */}
      <Hero />

      {/* Featured Categories */}
      <section className="featured-categories">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-image">
                <img 
                  src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Men's Fashion"
                  className="category-img"
                />
              </div>
              <div className="category-content">
                <h3 className="category-title">Men's Collection</h3>
                <p className="category-description">Stylish and comfortable clothing for the modern man</p>
                <Link 
                  to="/men" 
                  className="category-btn"
                  onMouseEnter={() => setShowMenPreview(true)}
                  onMouseLeave={() => setShowMenPreview(false)}
                >
                  Shop Men
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>

            <div className="category-card">
              <div className="category-image">
                <img 
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Women's Fashion"
                  className="category-img"
                />
              </div>
              <div className="category-content">
                <h3 className="category-title">Women's Collection</h3>
                <p className="category-description">Trendy and elegant fashion for every occasion</p>
                <Link to="/women" className="category-btn">
                  Shop Women
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>

            <div className="category-card">
              <div className="category-image">
                <img 
                  src="https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Kids Fashion"
                  className="category-img"
                />
              </div>
              <div className="category-content">
                <h3 className="category-title">Kids Collection</h3>
                <p className="category-description">Fun and comfortable clothing for active kids</p>
                <Link to="/kids" className="category-btn">
                  Shop Kids
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          {loading ? (
            <div className="loading-container">
              <p>Loading featured products...</p>
            </div>
          ) : (
            <div className="featured-products-grid">
              {featuredProducts.map((product) => (
                <div key={product.id} className={`featured-product-card ${product.is_available === 0 ? 'unavailable' : ''}`}>
                  <div className="featured-product-image">
                    <img 
                      src={product.image} 
                      alt={product.product_name}
                      className="featured-product-img"
                    />
                    {product.badge && (
                      <div className={`featured-product-badge ${product.badge.toLowerCase()}`}>
                        {product.badge}
                      </div>
                    )}
                    {product.is_available === 0 && (
                      <div className="unavailable-overlay">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  <div className="featured-product-info">
                    <h4 className="featured-product-name">{product.product_name}</h4>
                    <p className="featured-product-desc">
                      {product.category || 'Premium Quality Fashion'}
                    </p>
                    <div className="featured-availability-status">
                      {product.is_available === 0 ? (
                        <span className="status-unavailable">⚠️ Currently Unavailable</span>
                      ) : (
                        <span className="status-available">✓ In Stock</span>
                      )}
                    </div>
                    <p className="featured-product-price">
                      {product.original_price ? (
                        <>
                          <span className="original-price">{formatINR(product.original_price)}</span>
                          {formatINR(product.price)}
                        </>
                      ) : (
                        formatINR(product.price)
                      )}
                    </p>
                    <div className="featured-product-rating">
                      <span className="stars">{renderStars(product.stars)}</span>
                      <span className="rating-text">({product.rating})</span>
                    </div>
                    <div className="product-actions">
                      <button 
                        className="featured-add-to-cart"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.is_available === 0}
                      >
                        {product.is_available === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                      <button 
                        className="featured-add-to-wishlist"
                        onClick={() => handleAddToWishlist(product)}
                        title="Add to Wishlist"
                      >
                        ♡
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          {/* Newsletter Header */}
          <div className="newsletter-header">
            <h2 className="newsletter-main-title">Join the UrbanFit Community</h2>
            <p className="newsletter-subtitle">Get exclusive access to deals, style tips, and new arrivals</p>
          </div>

          <div className="newsletter-content">
            <div className="newsletter-text">
              <h3 className="newsletter-title">Stay in Style</h3>
              <p className="newsletter-description">
                Subscribe to our newsletter and be the first to know about new collections, 
                exclusive offers, and fashion tips.
              </p>
              
              {/* Newsletter Benefits */}
              <div className="newsletter-benefits">
                <div className="benefit-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="#2D898B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Exclusive sales & discounts</span>
                </div>
                <div className="benefit-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="#2D898B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Early access to new collections</span>
                </div>
                <div className="benefit-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="#2D898B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Style tips from fashion experts</span>
                </div>
              </div>
            </div>
            
            <div className="newsletter-signup">
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="newsletter-input"
                />
              </div>
              
              {/* Newsletter Visual */}
              <div className="newsletter-visual">
                <img 
                  src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Join UrbanFit Community"
                  className="newsletter-img"
                />
              </div>
              
              <p className="newsletter-note">
                Join over 10,000+ fashion enthusiasts who trust UrbanFit for the latest trends
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="m3.3 7 8.7 5 8.7-5M12 22V12" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="feature-title">Free Shipping</h3>
              <p className="feature-description">Free shipping on orders over $50</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 2a10 10 0 1 0 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">Quality Guarantee</h3>
              <p className="feature-description">30-day money back guarantee</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M12 6V2H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="m8 18-4 4V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">24/7 Support</h3>
              <p className="feature-description">Round-the-clock customer service</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <rect x="1" y="3" width="15" height="13" stroke="currentColor" strokeWidth="2"/>
                  <path d="m16 8 2 2-2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="m21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">Easy Returns</h3>
              <p className="feature-description">Hassle-free return process</p>
            </div>
          </div>
        </div>
      </section>

      {/* Men's Page Preview Modal */}
      {showMenPreview && (
        <div className="men-preview-modal">
          <div className="men-preview-content">
            <div className="men-preview-header">
              <div className="men-preview-badge">
                <span className="men-badge-text">Men's Collection 2025</span>
              </div>
              
              <h2 className="men-preview-title">
                Redefine Your
                <span className="men-title-highlight"> Masculine Style</span>
              </h2>
              
              <p className="men-preview-description">
                From sharp business attire to casual streetwear, discover our premium 
                collection designed for the modern man.
              </p>
            </div>

            <div className="men-preview-features">
              <div className="men-preview-feature-item">
                <div className="men-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                  </svg>
                </div>
                <span className="men-feature-text">Premium Quality</span>
              </div>
              <div className="men-preview-feature-item">
                <div className="men-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="men-feature-text">Lifetime Warranty</span>
              </div>
              <div className="men-preview-feature-item">
                <div className="men-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="men-feature-text">Free Shipping</span>
              </div>
            </div>

            <div className="men-preview-categories">
              <div className="men-category-item">
                <div className="men-category-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M16 3H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 21h8M8 3h8M12 17h.01" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span>Formal Wear</span>
              </div>
              <div className="men-category-item">
                <div className="men-category-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 2l3 6L6 14H3l3-6L3 2z" fill="currentColor"/>
                    <path d="M21 2l-3 6 3 6h3l-3-6 3-6z" fill="currentColor"/>
                  </svg>
                </div>
                <span>Casual</span>
              </div>
            </div>

            <div className="men-preview-cta">
              <Link to="/men" className="men-preview-btn">
                Explore Men's Collection
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MainContent;
