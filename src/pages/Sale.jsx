import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './Sale.css';

const Sale = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Countdown Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { hours, minutes, seconds } = prevTime;
        
        // Decrease seconds
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          // Decrease minutes
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            // Decrease hours
            if (hours > 0) {
              hours--;
            } else {
              // Reset to 24 hours when countdown ends
              hours = 23;
              minutes = 59;
              seconds = 59;
            }
          }
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (product) => {
    if (product.is_available === 0) return;
    addToCart({
      id: product.id,
      name: product.product_name,
      price: product.price,
      image: product.image
    });
  };

  const handleToggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      return;
    }
    addToWishlist({
      id: product.id,
      name: product.product_name,
      price: product.price,
      image: product.image,
      is_available: product.is_available
    });
  };

  const renderStars = (stars) => {
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  };

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.type === filter);

  return (
    <div className="sale-page">
      {/* Circular Hero Section */}
      <section className="sale-hero">
        <div className="sale-hero-bg">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
            <div className="shape shape-5"></div>
          </div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-text">🔥 FLASH SALE</span>
            </div>
            <h1 className="hero-title">
              <span className="hero-title-main">SUMMER</span>
              <span className="hero-title-sub">CLEARANCE</span>
            </h1>
            <p className="hero-subtitle">
              Up to 70% off on selected items • Limited time only
            </p>
            <div className="hero-timer">
              <div className="timer-circle">
                <div className="timer-inner">
                  <span className="timer-number">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="timer-label">Hours</span>
                </div>
              </div>
              <div className="timer-circle">
                <div className="timer-inner">
                  <span className="timer-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="timer-label">Minutes</span>
                </div>
              </div>
              <div className="timer-circle">
                <div className="timer-inner">
                  <span className="timer-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="timer-label">Seconds</span>
                </div>
              </div>
            </div>
            <div className="hero-actions">
              <Link to="#products" className="hero-btn-primary" onClick={(e) => {
                e.preventDefault();
                document.querySelector('.products-grid')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Shop Now
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/men" className="hero-btn-secondary">View Categories</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Diagonal Categories Section */}
      <section className="sale-categories">
        <div className="diagonal-bg"></div>
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            <div className="category-card category-card-1">
              <div className="category-content">
                <div className="category-icon">
                  <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="40" fill="#e74c3c" fillOpacity="0.2"/>
                    <path d="M30 35 L70 35 L75 75 L25 75 Z" fill="#e74c3c" fillOpacity="0.7"/>
                    <circle cx="40" cy="45" r="3" fill="#ffc107"/>
                    <circle cx="60" cy="45" r="3" fill="#ffc107"/>
                  </svg>
                </div>
                <h3 className="category-title">Women's Fashion</h3>
                <p className="category-discount">Up to 60% OFF</p>
                <button className="category-btn">Shop Now</button>
              </div>
            </div>
            
            <div className="category-card category-card-2">
              <div className="category-content">
                <div className="category-icon">
                  <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="40" fill="#2D898B" fillOpacity="0.2"/>
                    <rect x="35" y="30" width="30" height="40" rx="5" fill="#2D898B" fillOpacity="0.7"/>
                    <rect x="40" y="35" width="5" height="5" rx="1" fill="#DAFFEF"/>
                    <rect x="55" y="35" width="5" height="5" rx="1" fill="#DAFFEF"/>
                  </svg>
                </div>
                <h3 className="category-title">Men's Fashion</h3>
                <p className="category-discount">Up to 50% OFF</p>
                <button className="category-btn">Shop Now</button>
              </div>
            </div>
            
            <div className="category-card category-card-3">
              <div className="category-content">
                <div className="category-icon">
                  <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="40" fill="#ffc107" fillOpacity="0.2"/>
                    <ellipse cx="50" cy="65" rx="25" ry="8" fill="#ffc107" fillOpacity="0.8"/>
                    <path d="M30 50 Q30 30, 40 25 L60 25 Q70 30, 70 50 L65 65 Q55 70, 50 70 Q45 70, 35 65 Z" fill="white" fillOpacity="0.9"/>
                  </svg>
                </div>
                <h3 className="category-title">Footwear</h3>
                <p className="category-discount">Up to 40% OFF</p>
                <button className="category-btn">Shop Now</button>
              </div>
            </div>
            
            <div className="category-card category-card-4">
              <div className="category-content">
                <div className="category-icon">
                  <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="40" fill="#e74c3c" fillOpacity="0.2"/>
                    <rect x="40" y="30" width="20" height="30" rx="3" fill="#2D898B" fillOpacity="0.7"/>
                    <path d="M35 35 Q35 25, 45 25 Q50 25, 50 35" stroke="#2D898B" strokeWidth="2" fill="none"/>
                    <circle cx="50" cy="45" r="4" fill="#DAFFEF"/>
                  </svg>
                </div>
                <h3 className="category-title">Accessories</h3>
                <p className="category-discount">Up to 30% OFF</p>
                <button className="category-btn">Shop Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Masonry Product Grid */}
      <section className="sale-masonry">
        <div className="container">
          <div className="masonry-header">
            <h2 className="section-title">Hot Deals</h2>
            <div className="masonry-filters">
              <div className="filter-slider">
                <button 
                  className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All Items
                </button>
                <button 
                  className={`filter-tab ${filter === 'women' ? 'active' : ''}`}
                  onClick={() => setFilter('women')}
                >
                  Women
                </button>
                <button 
                  className={`filter-tab ${filter === 'men' ? 'active' : ''}`}
                  onClick={() => setFilter('men')}
                >
                  Men
                </button>
                <button 
                  className={`filter-tab ${filter === 'kids' ? 'active' : ''}`}
                  onClick={() => setFilter('kids')}
                >
                  Kids
                </button>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="loading-container">
              <p>Loading products...</p>
            </div>
          ) : (
            <div className="sale-products-grid">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className={`sale-product-card ${product.is_available === 0 ? 'unavailable' : ''}`}
                >
                  <div className="sale-product-image">
                    <img 
                      src={product.image} 
                      alt={product.product_name}
                      className="sale-product-img"
                    />
                    {product.is_available === 0 && (
                      <div className="unavailable-overlay">Out of Stock</div>
                    )}
                    {product.badge && (
                      <div className={`sale-product-badge ${product.badge.toLowerCase()}`}>
                        {product.badge}
                      </div>
                    )}
                    {product.original_price && !product.badge && (
                      <div className="sale-product-badge sale">
                        -{Math.round((1 - product.price / product.original_price) * 100)}% OFF
                      </div>
                    )}
                  </div>
                  <div className="sale-product-info">
                    <h3 className="sale-product-name">{product.product_name}</h3>
                    <p className="sale-product-desc">{product.description}</p>
                    <div className="sale-availability-status">
                      {product.is_available === 1 ? (
                        <span className="status-available">✓ In Stock</span>
                      ) : (
                        <span className="status-unavailable">✗ Out of Stock</span>
                      )}
                    </div>
                    <p className="sale-product-price">
                      {product.original_price ? (
                        <>
                          <span className="original-price">${product.original_price}</span>
                          <span className="sale-price">${product.price}</span>
                        </>
                      ) : (
                        `$${product.price}`
                      )}
                    </p>
                    <div className="sale-product-rating">
                      <span className="stars">{renderStars(product.stars)}</span>
                      <span className="rating-text">({product.reviews})</span>
                    </div>
                    <div className="product-actions">
                      <button 
                        className="sale-add-to-cart"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.is_available === 0}
                      >
                        {product.is_available === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                      <button 
                        className="sale-add-to-wishlist"
                        onClick={() => handleToggleWishlist(product)}
                        title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                      >
                        {isInWishlist(product.id) ? '♥' : '♡'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Floating Newsletter Section */}
      <section className="sale-floating-newsletter">
        <div className="floating-newsletter-container">
          <div className="floating-newsletter-card">
            <div className="newsletter-decoration">
              <div className="deco-circle deco-1"></div>
              <div className="deco-circle deco-2"></div>
              <div className="deco-circle deco-3"></div>
            </div>
            <div className="newsletter-content">
              <h3 className="newsletter-title">Stay Updated!</h3>
              <p className="newsletter-description">
                Get notified about exclusive sales and new arrivals
              </p>
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="newsletter-input"
                />
                <button className="newsletter-submit">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sale;
