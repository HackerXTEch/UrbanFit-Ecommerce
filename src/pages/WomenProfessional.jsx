import React from 'react';
import { Link } from 'react-router-dom';
import './WomenProfessional.css';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatINR } from '../utils/currency';

const WomenProfessional = () => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const products = [
    {
      id: 'pro-1',
      name: 'Executive Blazer',
      desc: 'Tailored wool blend, perfect fit',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Premium',
      is_available: true,
      ratingText: '(4.9)',
      stars: '★★★★★'
    },
    {
      id: 'pro-2',
      name: 'Business Sheath Dress',
      desc: 'Classic navy, knee-length',
      price: 189.99,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'New',
      is_available: true,
      ratingText: '(4.7)',
      stars: '★★★★☆'
    },
    {
      id: 'pro-3',
      name: 'High-Waist Pencil Skirt',
      desc: 'Stretch fabric, comfortable fit',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: '',
      is_available: true,
      ratingText: '(4.8)',
      stars: '★★★★★'
    },
    {
      id: 'pro-4',
      name: 'Classic White Blouse',
      desc: 'Cotton blend, wrinkle-resistant',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Bestseller',
      is_available: true,
      ratingText: '(4.8)',
      stars: '★★★★★'
    },
    {
      id: 'pro-5',
      name: 'Classic Pumps',
      desc: 'Comfortable 3-inch heel',
      price: 119.99,
      originalPrice: 159.99,
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Sale',
      is_available: true,
      ratingText: '(4.6)',
      stars: '★★★★☆'
    },
    {
      id: 'pro-6',
      name: 'Executive Handbag',
      desc: 'Leather, multiple compartments',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: '',
      is_available: false,
      ratingText: '(4.9)',
      stars: '★★★★★'
    }
  ];

  const handleAddToCart = (product) => {
    if (!product.is_available) return;
    addToCart({ 
      id: product.id, 
      name: product.name, 
      price: product.price,
      image: product.image,
      category: product.category || 'Professional',
      size: product.size || 'M'
    });
  };

  const handleToggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      return;
    }
    addToWishlist({ id: product.id, name: product.name, price: product.price });
  };

  return (
    <div className="women-professional-page">
      {/* Hero Section */}
      <section className="professional-hero">
        <div className="professional-hero-container">
          <div className="professional-hero-content">
            <div className="professional-hero-badge">
              <span className="professional-badge-text">Women's Professional Collection</span>
            </div>
            
            <h1 className="professional-hero-title">
              Power
              <span className="professional-hero-highlight"> Dressing</span>
            </h1>
            
            <p className="professional-hero-description">
              Command respect and confidence with our sophisticated collection of 
              professional wear designed for the modern working woman.
            </p>
            
            <div className="professional-hero-buttons">
              <Link to="#products" className="professional-btn-primary" onClick={(e) => {
                e.preventDefault();
                document.querySelector('.professional-products')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Shop All Professional Wear
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/size-guide" className="professional-btn-secondary">
                Size Guide
              </Link>
            </div>
          </div>

          <div className="professional-hero-visual">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Women's Professional Wear"
              className="professional-hero-img"
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="professional-products">
        <div className="container">
          <h2 className="professional-section-title">Professional Wardrobe Essentials</h2>
          
          <div className="professional-products-grid">
            {products.map((p) => (
              <div className="professional-product-card" key={p.id}>
                <div className="professional-product-image">
                  <img src={p.image} alt={p.name} className="professional-product-img" />
                  {p.badge ? <div className={`professional-product-badge ${p.badge === 'New' ? 'new' : p.badge === 'Sale' ? 'sale' : ''}`}>{p.badge}</div> : null}
                </div>
                <div className="professional-product-info">
                  <h3 className="professional-product-name">{p.name}</h3>
                  <p className="professional-product-desc">{p.desc}</p>
                  <p className="availability-status">{p.is_available ? '✓ In Stock' : 'Out of Stock'}</p>
                  <p className="professional-product-price">
                    {p.originalPrice ? <span className="original-price">{formatINR(p.originalPrice)}</span> : null}
                    <span className="current-price">{formatINR(p.price)}</span>
                  </p>
                  <div className="professional-product-rating">
                    <span className="stars">{p.stars}</span>
                    <span className="rating-text">{p.ratingText}</span>
                  </div>
                  <div className="product-actions">
                    <button className="professional-add-to-cart" onClick={() => handleAddToCart(p)} disabled={!p.is_available}>Add to Cart</button>
                    <button className="add-to-wishlist-btn" onClick={() => handleToggleWishlist(p)} aria-pressed={isInWishlist(p.id)} title="Add to wishlist">♥</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WomenProfessional;
