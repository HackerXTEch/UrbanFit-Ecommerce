import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductsByTypeAndCategory } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatINR } from '../utils/currency';
import './WomenCasualWear.css';

const WomenCasualWear = () => {
  const [casualProducts, setCasualProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProductsByTypeAndCategory('women', 'casual');
      setCasualProducts(data);
      setLoading(false);
    };
    fetchProducts();
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
      image: product.image
    });
  };

  return (
    <div className="women-casual-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">›</span>
          <Link to="/women" className="breadcrumb-link">Women</Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">Casual Wear</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="casual-hero">
        <div className="casual-hero-container">
          <div className="casual-hero-content">
            <div className="casual-hero-badge">
              <span className="casual-badge-text">Comfort Meets Style</span>
            </div>
            
            <h1 className="casual-hero-title">
              Casual Wear That
              <span className="casual-hero-highlight"> Defines You</span>
            </h1>
            
            <p className="casual-hero-description">
              From everyday essentials to weekend favorites, discover our carefully curated 
              collection of casual wear that combines comfort with effortless style.
            </p>
            
            <div className="casual-hero-stats">
              <div className="casual-stat-item">
                <span className="casual-stat-number">{casualProducts.length}+</span>
                <span className="casual-stat-label">Products</span>
              </div>
              <div className="casual-stat-item">
                <span className="casual-stat-number">4.7★</span>
                <span className="casual-stat-label">Rating</span>
              </div>
              <div className="casual-stat-item">
                <span className="casual-stat-number">2K+</span>
                <span className="casual-stat-label">Reviews</span>
              </div>
            </div>
            
            <div className="casual-hero-buttons">
              <Link to="#products" className="casual-btn-primary" onClick={(e) => {
                e.preventDefault();
                document.querySelector('.products-section')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Shop Collection
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/women/evening-wear" className="casual-btn-secondary">
                Evening Wear
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="casual-hero-visual">
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Women's Casual Wear"
              className="casual-hero-img"
            />
          </div>
        </div>
        
        {/* Casual hero background decoration */}
        <div className="casual-hero-decoration">
          <div className="casual-decoration-circle casual-circle-1"></div>
          <div className="casual-decoration-circle casual-circle-2"></div>
          <div className="casual-decoration-lines">
            <div className="casual-line"></div>
            <div className="casual-line"></div>
            <div className="casual-line"></div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="container">
          {loading ? (
            <div className="loading-container">
              <p>Loading products...</p>
            </div>
          ) : (
            <div className="casual-products-grid">
              {casualProducts.map(product => (
                <div key={product.id} className={`casual-product-card ${product.is_available === 0 ? 'unavailable' : ''}`}>
                  <div className="casual-product-image">
                    <img 
                      src={product.image} 
                      alt={product.product_name} 
                      className="casual-product-img" 
                    />
                    {product.badge && (
                      <div className={`casual-product-badge ${product.badge.toLowerCase()}`}>
                        {product.badge}
                      </div>
                    )}
                    {product.is_available === 0 && (
                      <div className="unavailable-overlay">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  <div className="casual-product-info">
                    <h3 className="casual-product-name">{product.product_name}</h3>
                    <p className="casual-product-desc">{product.description}</p>
                    <div className="casual-availability-status">
                      {product.is_available === 0 ? (
                        <span className="status-unavailable">⚠️ Currently Unavailable</span>
                      ) : (
                        <span className="status-available">✓ In Stock</span>
                      )}
                    </div>
                    <p className="casual-product-price">
                      {product.original_price && (
                        <span className="original-price">{formatINR(product.original_price)}</span>
                      )}
                      {formatINR(product.price)}
                    </p>
                    <div className="casual-product-rating">
                      <span className="stars">{'★'.repeat(product.stars || 0)}{'☆'.repeat(5 - (product.stars || 0))}</span>
                      <span className="rating-text">({product.rating})</span>
                    </div>
                    <div className="product-actions">
                      <button 
                        className="casual-add-to-cart" 
                        onClick={() => handleAddToCart(product)} 
                        disabled={product.is_available === 0}
                      >
                        {product.is_available === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                      <button 
                        className="casual-add-to-wishlist" 
                        onClick={() => handleToggleWishlist(product)}
                        title="Add to wishlist"
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
    </div>
  );
};

export default WomenCasualWear;
