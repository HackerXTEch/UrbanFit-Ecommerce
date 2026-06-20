import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductsByTypeAndCategory } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './KidsBoys.css';

const KidsBoys = () => {
  const [boysProducts, setBoysProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProductsByTypeAndCategory('kids', 'boys');
      setBoysProducts(data);
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
    <div className="kids-boys-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">›</span>
          <Link to="/kids" className="breadcrumb-link">Kids</Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">Boys</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="boys-hero">
        <div className="boys-hero-container">
          <div className="boys-hero-content">
            <div className="boys-hero-badge">
              <span className="boys-badge-text">Boys Adventure Collection</span>
            </div>
            
            <h1 className="boys-hero-title">
              Cool & 
              <span className="boys-hero-highlight"> Adventurous</span>
            </h1>
            
            <p className="boys-hero-description">
              Discover awesome clothing for boys who love to explore, play, and express their 
              unique style. From cool graphics to comfortable fits - we've got it all!
            </p>
            
            <div className="boys-hero-stats">
              <div className="boys-stat-item">
                <span className="boys-stat-number">{boysProducts.length}+</span>
                <span className="boys-stat-label">Cool Items</span>
              </div>
              <div className="boys-stat-item">
                <span className="boys-stat-number">4.8★</span>
                <span className="boys-stat-label">Rating</span>
              </div>
              <div className="boys-stat-item">
                <span className="boys-stat-number">100%</span>
                <span className="boys-stat-label">Fun Factor</span>
              </div>
            </div>
            
            <div className="boys-hero-buttons">
              <Link to="#products" className="boys-btn-primary" onClick={(e) => {
                e.preventDefault();
                document.querySelector('.products-section')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Shop Boys Collection
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/kids/girls" className="boys-btn-secondary">
                Girls Collection
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="boys-hero-visual">
            <img 
              src="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Kids Boys Wear"
              className="boys-hero-img"
            />
          </div>
        </div>
        
        {/* Boys' hero background decoration */}
        <div className="boys-hero-decoration">
          <div className="boys-decoration-shape boys-shape-1"></div>
          <div className="boys-decoration-shape boys-shape-2"></div>
          <div className="boys-decoration-lines">
            <div className="boys-line"></div>
            <div className="boys-line"></div>
            <div className="boys-line"></div>
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
            <div className="boys-products-grid">
              {boysProducts.map(product => (
                <div key={product.id} className={`boys-product-card ${product.is_available === 0 ? 'unavailable' : ''}`}>
                  <div className="boys-product-image">
                    <img 
                      src={product.image} 
                      alt={product.product_name}
                      className="boys-product-img"
                    />
                    {(product.is_on_sale || product.is_trending) && (
                      <div className="boys-product-badge">
                        {product.is_on_sale ? 'Sale' : 'Trending'}
                      </div>
                    )}
                    {product.is_available === 0 && (
                      <div className="unavailable-overlay">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  
                  <div className="boys-product-info">
                    <h3 className="boys-product-name">{product.product_name}</h3>
                    <p className="boys-product-desc">{product.description}</p>
                    
                    <div className="boys-availability-status">
                      {product.is_available === 0 ? (
                        <span className="status-unavailable">⚠️ Currently Unavailable</span>
                      ) : (
                        <span className="status-available">✓ In Stock</span>
                      )}
                    </div>
                    
                    <p className="boys-product-price">
                      {product.original_price && (
                        <span className="original-price">${product.original_price}</span>
                      )}
                      ${product.price}
                    </p>
                    
                    <div className="boys-product-rating">
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
                        className="boys-add-to-cart"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.is_available === 0}
                      >
                        {product.is_available === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                      <button 
                        className="boys-add-to-wishlist"
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

export default KidsBoys;
