import React from 'react';
import { Link } from 'react-router-dom';
import './WomenEveningWear.css';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const WomenEveningWear = () => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const products = [
    {
      id: 'evening-1',
      name: 'Elegant Black Gown',
      desc: 'Floor-length, silk blend fabric',
      price: 459.99,
      image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Premium',
      is_available: true,
      ratingText: '(4.9)',
      stars: '★★★★★'
    },
    {
      id: 'evening-2',
      name: 'Red Cocktail Dress',
      desc: 'Midi-length, perfect for parties',
      price: 289.99,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'New',
      is_available: true,
      ratingText: '(4.7)',
      stars: '★★★★☆'
    },
    {
      id: 'evening-3',
      name: 'Navy Blue Elegance',
      desc: 'Classic cut, timeless style',
      price: 329.99,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: '',
      is_available: true,
      ratingText: '(4.8)',
      stars: '★★★★★'
    },
    {
      id: 'evening-4',
      name: 'Emerald Green Gown',
      desc: 'Luxurious satin, dramatic silhouette',
      price: 399.99,
      image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Trending',
      is_available: true,
      ratingText: '(4.9)',
      stars: '★★★★★'
    },
    {
      id: 'evening-5',
      name: 'Gold Sequin Glamour',
      desc: 'Sparkling sequins, party perfect',
      price: 249.99,
      originalPrice: 299.99,
      image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Sale',
      is_available: true,
      ratingText: '(4.6)',
      stars: '★★★★☆'
    },
    {
      id: 'evening-6',
      name: 'Wine Red Velvet',
      desc: 'Rich velvet fabric, elegant design',
      price: 379.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: '',
      is_available: false,
      ratingText: '(4.8)',
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
      category: product.category || 'Evening Wear',
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
    <div className="women-evening-page">
      {/* Hero Section */}
      <section className="evening-hero">
        <div className="evening-hero-container">
          <div className="evening-hero-content">
            <div className="evening-hero-badge">
              <span className="evening-badge-text">Women's Evening Collection</span>
            </div>
            
            <h1 className="evening-hero-title">
              Glamorous
              <span className="evening-hero-highlight"> Evening Elegance</span>
            </h1>
            
            <p className="evening-hero-description">
              Make every special occasion unforgettable with our stunning collection of 
              evening dresses designed to make you feel absolutely radiant.
            </p>
            
            <div className="evening-hero-buttons">
              <Link to="#products" className="evening-btn-primary" onClick={(e) => {
                e.preventDefault();
                document.querySelector('.evening-products')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Shop All Evening Wear
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/women" className="evening-btn-secondary">
                All Women's Wear
              </Link>
            </div>
          </div>

          <div className="evening-hero-visual">
            <img 
              src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Women's Evening Wear"
              className="evening-hero-img"
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="evening-products">
        <div className="container">
          <h2 className="evening-section-title">Stunning Evening Dresses</h2>
          
          <div className="evening-products-grid">
            {products.map((p) => (
              <div className="evening-product-card" key={p.id}>
                <div className="evening-product-image">
                  <img src={p.image} alt={p.name} className="evening-product-img" />
                  {p.badge ? <div className={`evening-product-badge ${p.badge === 'New' ? 'new' : p.badge === 'Sale' ? 'sale' : ''}`}>{p.badge}</div> : null}
                </div>
                <div className="evening-product-info">
                  <h3 className="evening-product-name">{p.name}</h3>
                  <p className="evening-product-desc">{p.desc}</p>
                  <p className="availability-status">{p.is_available ? '✓ In Stock' : 'Out of Stock'}</p>
                  <p className="evening-product-price">
                    {p.originalPrice ? <span className="original-price">${p.originalPrice.toFixed(2)}</span> : null}
                    <span className="current-price">${p.price.toFixed(2)}</span>
                  </p>
                  <div className="evening-product-rating">
                    <span className="stars">{p.stars}</span>
                    <span className="rating-text">{p.ratingText}</span>
                  </div>
                  <div className="product-actions">
                    <button className="evening-add-to-cart" onClick={() => handleAddToCart(p)} disabled={!p.is_available}>Add to Cart</button>
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

export default WomenEveningWear;
