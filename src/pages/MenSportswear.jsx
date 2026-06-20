import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductsByTypeAndCategory } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './MenSportswear.css';

const MenSportswear = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProductsByTypeAndCategory('men', 'sports');
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
    <div className="men-sportswear-page">
      {/* Hero Section */}
      <section className="sportswear-hero">
        <div className="sportswear-hero-container">
          <div className="sportswear-hero-content">
            <div className="sportswear-hero-badge">
              <span className="sportswear-badge-text">Men's Sportswear Collection</span>
            </div>
            
            <h1 className="sportswear-hero-title">
              Performance
              <span className="sportswear-hero-highlight"> Athletic Wear</span>
            </h1>
            
            <p className="sportswear-hero-description">
              Unleash your athletic potential with our high-performance sportswear collection. 
              Designed for champions, built for comfort, engineered for excellence.
            </p>
            
            <div className="sportswear-hero-buttons">
              <Link to="#products" className="sportswear-btn-primary" onClick={(e) => {
                e.preventDefault();
                document.querySelector('.sportswear-products')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Shop All Sportswear
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/men" className="sportswear-btn-secondary">
                All Men's Wear
              </Link>
            </div>
          </div>

          <div className="sportswear-hero-visual">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Men's Sportswear"
              className="sportswear-hero-img"
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="sportswear-products">
        <div className="container">
          <h2 className="sportswear-section-title">Athletic Essentials</h2>
          
          {loading ? (
            <div className="loading-container">
              <p>Loading products...</p>
            </div>
          ) : (
            <div className="sportswear-products-grid">
              {products.map(product => (
                <div key={product.id} className={`sportswear-product-card ${product.is_available === 0 ? 'unavailable' : ''}`}>
                  <div className="sportswear-product-image">
                    <img 
                      src={product.image} 
                      alt={product.product_name}
                      className="sportswear-product-img"
                    />
                    {product.badge && (
                      <div className={`sportswear-product-badge ${product.badge.toLowerCase()}`}>
                        {product.badge}
                      </div>
                    )}
                    {product.is_available === 0 && (
                      <div className="unavailable-overlay">
                        <span>Out of Stock</span>
                      </div>
                    )}
                  </div>
                  <div className="sportswear-product-info">
                    <h3 className="sportswear-product-name">{product.product_name}</h3>
                    <p className="sportswear-product-desc">{product.description}</p>
                    <div className="sportswear-availability-status">
                      {product.is_available === 0 ? (
                        <span className="status-unavailable">⚠️ Currently Unavailable</span>
                      ) : (
                        <span className="status-available">✓ In Stock</span>
                      )}
                    </div>
                    <p className="sportswear-product-price">
                      {product.original_price ? (
                        <>
                          <span className="original-price">${product.original_price}</span>
                          <span className="sale-price">${product.price}</span>
                        </>
                      ) : (
                        `$${product.price}`
                      )}
                    </p>
                    <div className="sportswear-product-rating">
                      <span className="stars">{renderStars(product.stars)}</span>
                      <span className="rating-text">({product.rating})</span>
                    </div>
                    <div className="product-actions">
                      <button 
                        className="sportswear-add-to-cart"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.is_available === 0}
                      >
                        {product.is_available === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                      <button 
                        className="sportswear-add-to-wishlist"
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
      <section className="sportswear-features">
        <div className="container">
          <h2 className="sportswear-section-title">Why Choose Our Sportswear?</h2>
          <div className="sportswear-features-grid">
            <div className="sportswear-feature-item">
              <div className="sportswear-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="sportswear-feature-title">Performance Technology</h3>
              <p className="sportswear-feature-desc">Advanced fabrics for peak performance</p>
            </div>
            
            <div className="sportswear-feature-item">
              <div className="sportswear-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2a10 10 0 1 0 10 10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M7 13l3 3 7-7" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="sportswear-feature-title">Moisture-Wicking</h3>
              <p className="sportswear-feature-desc">Stay dry and comfortable during workouts</p>
            </div>
            
            <div className="sportswear-feature-item">
              <div className="sportswear-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="sportswear-feature-title">Athletic Fit</h3>
              <p className="sportswear-feature-desc">Designed for optimal movement and flexibility</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenSportswear;
