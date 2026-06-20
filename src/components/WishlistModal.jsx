import React from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatINR } from '../utils/currency';
import './WishlistModal.css';

const WishlistModal = ({ isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { wishlistItems, removeFromWishlist } = useWishlist();

  if (!isOpen) return null;

  const handleAddToCart = (item) => {
    addToCart(item);
    // Remove from wishlist after adding to cart
    removeFromWishlist(item.id);
  };

  const handleRemoveFromWishlist = (itemId) => {
    removeFromWishlist(itemId);
  };

  const moveAllToCart = () => {
    const availableItems = wishlistItems.filter(item => item.is_available !== 0);
    availableItems.forEach(item => {
      addToCart(item);
      removeFromWishlist(item.id);
    });
  };

  return (
    <div className="wishlist-modal-overlay" onClick={onClose}>
      <div className="wishlist-modal" onClick={(e) => e.stopPropagation()}>
        <div className="wishlist-header">
          <h2 className="wishlist-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor"/>
            </svg>
            My Wishlist ({wishlistItems.length})
          </h2>
          <button className="close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="wishlist-content">
          {wishlistItems.length === 0 ? (
            <div className="empty-wishlist">
              <div className="empty-wishlist-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Your wishlist is empty</h3>
              <p>Save items you love for later!</p>
              <button className="continue-shopping-btn" onClick={onClose}>
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="wishlist-actions-bar">
                <button className="move-all-btn" onClick={moveAllToCart}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-6M7 13H5l-2-8m16 8v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Move All to Cart
                </button>
                <span className="items-count">{wishlistItems.filter(item => item.is_available !== 0).length} available items</span>
              </div>

              <div className="wishlist-items">
                {wishlistItems.map((item) => (
                  <div key={item.id} className={`wishlist-item ${item.is_available === 0 ? 'out-of-stock' : ''}`}>
                    <div className="item-image">
                      <img src={item.image} alt={item.product_name} />
                      {item.is_available === 0 && <div className="out-of-stock-overlay">Out of Stock</div>}
                    </div>
                    <div className="item-details">
                      <h4 className="item-name">{item.product_name}</h4>
                      <p className="item-category">{item.category}</p>
                      <div className="item-price">
                        <span className="price">{formatINR(item.price)}</span>
                        {item.is_available === 0 ? (
                          <span className="stock-status unavailable">Currently unavailable</span>
                        ) : (
                          <span className="stock-status available">In Stock</span>
                        )}
                      </div>
                    </div>
                    <div className="item-actions">
                      {item.is_available !== 0 ? (
                        <button 
                          className="add-to-cart-btn"
                          onClick={() => handleAddToCart(item)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-6M7 13H5l-2-8m16 8v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Add to Cart
                        </button>
                      ) : (
                        <button className="notify-btn" disabled>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Notify Me
                        </button>
                      )}
                      <button 
                        className="remove-wishlist-btn"
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        title="Remove from wishlist"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistModal;
