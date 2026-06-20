import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import CartModal from './CartModal';
import WishlistModal from './WishlistModal';
import ProfileModal from './ProfileModal';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { totalItems } = useCart();
  const { totalWishlistItems } = useWishlist();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const toggleWishlist = () => {
    setIsWishlistOpen(!isWishlistOpen);
  };

  const closeWishlist = () => {
    setIsWishlistOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo">
          <Link to="/" className="logo-link">
            <h1 className="logo-text">UrbanFit</h1>
            <span className="logo-tagline">Style Your Life</span>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/men" className="nav-link">Men</Link></li>
            <li><Link to="/women" className="nav-link">Women</Link></li>
            <li><Link to="/kids" className="nav-link">Kids</Link></li>
            <li><Link to="/sale" className="nav-link sale-link">Sale</Link></li>
            <li><Link to="/about" className="nav-link">About</Link></li>
          </ul>
        </nav>

        {/* Right Section - Search, Cart, User */}
        <div className="header-actions">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="search-input"
            />
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19S2 15.194 2 10.5 5.806 2 10.5 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="header-icons">
            <button className="icon-btn" onClick={toggleWishlist}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {totalWishlistItems > 0 && <span className="icon-badge">{totalWishlistItems}</span>}
            </button>

            <button className="icon-btn" onClick={toggleCart}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-6M7 13H5l-2-8m16 8v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="icon-badge">{totalItems}</span>
            </button>

            <div className="user-profile-section" onClick={toggleProfile}>
              <div className="user-avatar">
                  <div className="avatar-initials">{(user?.fullName || 'G').split(/\s+/).slice(0,2).map(n=>n[0]?.toUpperCase()).join('')}</div>
              </div>
              <span className="user-name">{user?.fullName || 'Guest'}</span>
            </div>

            <button className="icon-btn logout-btn" onClick={handleLogout} title="Logout">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={closeCart} />
      
      {/* Wishlist Modal */}
      <WishlistModal isOpen={isWishlistOpen} onClose={closeWishlist} />
      
      {/* Profile Modal */}
      <ProfileModal isOpen={isProfileOpen} onClose={closeProfile} />
    </header>
  );
};

export default Header;