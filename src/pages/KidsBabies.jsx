import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getProductsByTypeAndCategory } from '../services/api';
import './KidsBabies.css';

const KidsBabies = () => {
  const [babyProducts, setBabyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProductsByTypeAndCategory('kids', 'babies');
      setBabyProducts(data);
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

  return (
    <div className="kids-babies-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">›</span>
          <Link to="/kids" className="breadcrumb-link">Kids</Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">Babies</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="babies-hero">
        <div className="babies-hero-container">
          <div className="babies-hero-content">
            <div className="babies-hero-badge">
              <span className="babies-badge-text">Baby Essentials Collection</span>
            </div>
            
            <h1 className="babies-hero-title">
              Sweet & 
              <span className="babies-hero-highlight"> Gentle</span>
            </h1>
            
            <p className="babies-hero-description">
              Discover soft and gentle clothing for your precious little ones. 
              From cozy onesies to adorable outfits - perfect for every sweet moment!
            </p>
            
            <div className="babies-hero-stats">
              <div className="babies-stat-item">
                <span className="babies-stat-number">{babyProducts.length}+</span>
                <span className="babies-stat-label">Soft Items</span>
              </div>
              <div className="babies-stat-item">
                <span className="babies-stat-number">4.9★</span>
                <span className="babies-stat-label">Rating</span>
              </div>
              <div className="babies-stat-item">
                <span className="babies-stat-number">100%</span>
                <span className="babies-stat-label">Safe Materials</span>
              </div>
            </div>
            
            <div className="babies-hero-buttons">
              <Link to="#products" className="babies-btn-primary" onClick={(e) => {
                e.preventDefault();
                document.querySelector('.products-section')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Shop Baby Collection
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/kids/boys" className="babies-btn-secondary">
                Boys Collection
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="babies-hero-visual">
            <img 
              src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Baby Wear"
              className="babies-hero-img"
            />
          </div>
        </div>
        
        {/* Babies' hero background decoration */}
        <div className="babies-hero-decoration">
          <div className="babies-decoration-shape babies-shape-1"></div>
          <div className="babies-decoration-shape babies-shape-2"></div>
          <div className="babies-decoration-lines">
            <div className="babies-line"></div>
            <div className="babies-line"></div>
            <div className="babies-line"></div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="container">
          {loading ? (
            <div className="loading-container">
              <p>Loading products...</p>
            </div>
          ) : (
            <div className="babies-products-grid">
              {babyProducts.map(product => (
                <div key={product.id} className={`babies-product-card ${product.is_available === 0 ? 'unavailable' : ''}`}>
                  <div className="babies-product-image">
                    <img 
                      src={product.image} 
                      alt={product.product_name}
                      className="babies-product-img"
                    />
                    {(product.is_on_sale || product.is_trending) && (
                      <div className="babies-product-badge">
                        {product.is_on_sale ? 'Sale' : 'Trending'}
                      </div>
                    )}
                    {product.is_available === 0 && (
                      <div className="unavailable-overlay">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  
                  <div className="babies-product-info">
                    <h3 className="babies-product-name">{product.product_name}</h3>
                    
                    {product.description && (
                      <p className="babies-product-desc">{product.description}</p>
                    )}
                    
                    <div className="babies-availability-status">
                      {product.is_available === 0 ? (
                        <span className="status-unavailable">⚠️ Currently Unavailable</span>
                      ) : (
                        <span className="status-available">✓ In Stock</span>
                      )}
                    </div>
                    
                    <p className="babies-product-price">
                      {product.original_price && (
                        <span className="original-price">${product.original_price}</span>
                      )}
                      ${product.price}
                    </p>
                    
                    <div className="babies-product-rating">
                      <span className="stars">
                        {[...Array(5)].map((_, index) => (
                          <span key={index}>
                            {index < product.stars ? '★' : '☆'}
                          </span>
                        ))}
                      </span>
                      <span className="rating-text">({product.rating})</span>
                    </div>
                    
                    <div className="product-actions">
                      <button 
                        className="babies-add-to-cart"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.is_available === 0}
                      >
                        {product.is_available === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                      <button 
                        className="babies-add-to-wishlist"
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
    </div>
  );
};

export default KidsBabies;
