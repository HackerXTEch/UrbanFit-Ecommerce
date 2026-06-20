import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductsByTypeAndCategory } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatINR } from '../utils/currency';
import './KidsGirls.css';

const KidsGirls = () => {
  const [girlsProducts, setGirlsProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProductsByTypeAndCategory('kids', 'girls');
      setGirlsProducts(data);
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
    <div className="kids-girls-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">›</span>
          <Link to="/kids" className="breadcrumb-link">Kids</Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">Girls</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="girls-hero">
        <div className="girls-hero-container">
          <div className="girls-hero-content">
            <div className="girls-hero-badge">
              <span className="girls-badge-text">Girls Princess Collection</span>
            </div>
            
            <h1 className="girls-hero-title">
              Pretty & 
              <span className="girls-hero-highlight"> Elegant</span>
            </h1>
            
            <p className="girls-hero-description">
              Discover beautiful clothing for girls who love to look stylish and feel confident. 
              From princess dresses to casual wear - perfect for every little fashionista!
            </p>
            
            <div className="girls-hero-stats">
              <div className="girls-stat-item">
                <span className="girls-stat-number">{girlsProducts.length}+</span>
                <span className="girls-stat-label">Beautiful Items</span>
              </div>
              <div className="girls-stat-item">
                <span className="girls-stat-number">4.8★</span>
                <span className="girls-stat-label">Rating</span>
              </div>
              <div className="girls-stat-item">
                <span className="girls-stat-number">100%</span>
                <span className="girls-stat-label">Style Factor</span>
              </div>
            </div>
            
            <div className="girls-hero-buttons">
              <Link to="#products" className="girls-btn-primary" onClick={(e) => {
                e.preventDefault();
                document.querySelector('.products-section')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Shop Girls Collection
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/kids/babies" className="girls-btn-secondary">
                Baby Collection
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="girls-hero-visual">
            <img 
              src="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Kids Girls Wear"
              className="girls-hero-img"
            />
          </div>
        </div>
        
        {/* Girls' hero background decoration */}
        <div className="girls-hero-decoration">
          <div className="girls-decoration-shape girls-shape-1"></div>
          <div className="girls-decoration-shape girls-shape-2"></div>
          <div className="girls-decoration-lines">
            <div className="girls-line"></div>
            <div className="girls-line"></div>
            <div className="girls-line"></div>
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
            <div className="girls-products-grid">
              {girlsProducts.map(product => (
                <div key={product.id} className={`girls-product-card ${product.is_available === 0 ? 'unavailable' : ''}`}>
                  <div className="girls-product-image">
                    <img 
                      src={product.image} 
                      alt={product.product_name}
                      className="girls-product-img"
                    />
                    {(product.is_on_sale || product.is_trending) && (
                      <div className="girls-product-badge">
                        {product.is_on_sale ? 'Sale' : 'Trending'}
                      </div>
                    )}
                    {product.is_available === 0 && (
                      <div className="unavailable-overlay">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  
                  <div className="girls-product-info">
                    <h3 className="girls-product-name">{product.product_name}</h3>
                    
                    {product.description && (
                      <p className="girls-product-desc">{product.description}</p>
                    )}
                    
                    <div className="girls-availability-status">
                      {product.is_available === 0 ? (
                        <span className="status-unavailable">⚠️ Currently Unavailable</span>
                      ) : (
                        <span className="status-available">✓ In Stock</span>
                      )}
                    </div>
                    
                    <p className="girls-product-price">
                      {product.original_price && (
                        <span className="original-price">{formatINR(product.original_price)}</span>
                      )}
                      {formatINR(product.price)}
                    </p>
                    
                    <div className="girls-product-rating">
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
                        className="girls-add-to-cart"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.is_available === 0}
                      >
                        {product.is_available === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                      <button 
                        className="girls-add-to-wishlist"
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

export default KidsGirls;
