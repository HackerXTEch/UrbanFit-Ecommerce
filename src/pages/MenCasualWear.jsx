import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductsByTypeAndCategory } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './MenCasualWear.css';

const MenCasualWear = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProductsByTypeAndCategory('men', 'casual');
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
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
    <div className="men-casual-page">
      {/* Hero Section */}
      <section className="casual-hero">
        <div className="casual-hero-container">
          <div className="casual-hero-content">
            <div className="casual-hero-badge">
              <span className="casual-badge-text">Men's Casual Collection</span>
            </div>
            
            <h1 className="casual-hero-title">
              Relaxed
              <span className="casual-hero-highlight"> Everyday Style</span>
            </h1>
            
            <p className="casual-hero-description">
              Discover comfort meets style with our premium casual collection. 
              Perfect for weekends, work-from-home days, and everything in between.
            </p>
            
            <div className="casual-hero-buttons">
              <Link to="#products" className="casual-btn-primary" onClick={(e) => {
                e.preventDefault();
                document.querySelector('.casual-products')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Shop All Casual Wear
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/men/formal-wear" className="casual-btn-secondary">
                View Formal Wear
              </Link>
            </div>
          </div>

          <div className="casual-hero-visual">
            <img 
              src="https://images.unsplash.com/photo-1516414447565-b14be0adf13e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Men's Casual Style"
              className="casual-hero-img"
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="casual-products">
        <div className="container">
          <h2 className="casual-section-title">Casual Essentials</h2>
          
          {loading ? (
            <div className="loading-container">
              <p>Loading products...</p>
            </div>
          ) : (
            <div className="casual-products-grid">
              {products.map(product => (
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
                        <span>Out of Stock</span>
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
                      {product.original_price ? (
                        <>
                          <span className="original-price">${product.original_price}</span>
                          <span className="sale-price">${product.price}</span>
                        </>
                      ) : (
                        `$${product.price}`
                      )}
                    </p>
                    <div className="casual-product-rating">
                      <span className="stars">{renderStars(product.stars)}</span>
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

      {/* Features Section */}
      <section className="casual-features">
        <div className="container">
          <h2 className="casual-section-title">Why Choose Our Casual Wear?</h2>
          <div className="casual-features-grid">
            <div className="casual-feature-item">
              <div className="casual-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2a10 10 0 1 0 10 10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M7 13l3 3 7-7" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="casual-feature-title">All-Day Comfort</h3>
              <p className="casual-feature-desc">Soft fabrics designed for maximum comfort</p>
            </div>
            
            <div className="casual-feature-item">
              <div className="casual-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18l-2 13H5L3 6z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 6V4a2 2 0 0 1 4 0v2" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="casual-feature-title">Versatile Style</h3>
              <p className="casual-feature-desc">Perfect for any casual occasion</p>
            </div>
            
            <div className="casual-feature-item">
              <div className="casual-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="casual-feature-title">Premium Quality</h3>
              <p className="casual-feature-desc">Durable materials that last</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenCasualWear;
