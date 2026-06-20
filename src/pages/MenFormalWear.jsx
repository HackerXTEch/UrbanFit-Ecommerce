import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductsByTypeAndCategory } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './MenFormalWear.css';

const MenFormalWear = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProductsByTypeAndCategory('men', 'formal');
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
    <div className="men-formal-page">
      {/* Hero Section */}
      <section className="formal-hero">
        <div className="formal-hero-container">
          <div className="formal-hero-content">
            <div className="formal-hero-badge">
              <span className="formal-badge-text">Men's Formal Collection</span>
            </div>
            
            <h1 className="formal-hero-title">
              Executive
              <span className="formal-hero-highlight"> Business Style</span>
            </h1>
            
            <p className="formal-hero-description">
              Elevate your professional wardrobe with our premium collection of suits, 
              dress shirts, and formal accessories designed for the modern executive.
            </p>
            
            <div className="formal-hero-buttons">
              <Link to="#products" className="formal-btn-primary" onClick={(e) => {
                e.preventDefault();
                document.querySelector('.formal-products')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Shop All Formal Wear
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/size-guide" className="formal-btn-secondary">
                Size Guide
              </Link>
            </div>
          </div>

          <div className="formal-hero-visual">
            <img 
              src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Men's Formal Wear"
              className="formal-hero-img"
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="formal-products">
        <div className="container">
          <h2 className="formal-section-title">Premium Formal Wear</h2>
          
          {loading ? (
            <div className="loading-container">
              <p>Loading products...</p>
            </div>
          ) : (
            <div className="formal-products-grid">
              {products.map(product => (
                <div key={product.id} className={`formal-product-card ${product.is_available === 0 ? 'unavailable' : ''}`}>
                  <div className="formal-product-image">
                    <img 
                      src={product.image} 
                      alt={product.product_name}
                      className="formal-product-img"
                    />
                    {product.badge && (
                      <div className={`formal-product-badge ${product.badge.toLowerCase()}`}>
                        {product.badge}
                      </div>
                    )}
                    {product.is_available === 0 && (
                      <div className="unavailable-overlay">
                        <span>Out of Stock</span>
                      </div>
                    )}
                  </div>
                  <div className="formal-product-info">
                    <h3 className="formal-product-name">{product.product_name}</h3>
                    <p className="formal-product-desc">{product.description}</p>
                    <div className="formal-availability-status">
                      {product.is_available === 0 ? (
                        <span className="status-unavailable">⚠️ Currently Unavailable</span>
                      ) : (
                        <span className="status-available">✓ In Stock</span>
                      )}
                    </div>
                    <p className="formal-product-price">
                      {product.original_price ? (
                        <>
                          <span className="original-price">${product.original_price}</span>
                          <span className="sale-price">${product.price}</span>
                        </>
                      ) : (
                        `$${product.price}`
                      )}
                    </p>
                    <div className="formal-product-rating">
                      <span className="stars">{renderStars(product.stars)}</span>
                      <span className="rating-text">({product.rating})</span>
                    </div>
                    <div className="product-actions">
                      <button 
                        className="formal-add-to-cart"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.is_available === 0}
                      >
                        {product.is_available === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                      <button 
                        className="formal-add-to-wishlist"
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
  
    </div>
  );
};

export default MenFormalWear;
