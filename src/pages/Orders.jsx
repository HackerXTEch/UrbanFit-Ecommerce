import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { formatINR } from '../utils/currency';
import './Orders.css';

const API_BASE = 'http://localhost:3001';

const Orders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancellingOrder, setCancellingOrder] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  const fetchOrders = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/orders/user/${user.id}`);
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchOrders();
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, navigate]);

  const handleCancelOrder = async (orderId) => {
    setOrderToCancel(orderId);
    setShowCancelModal(true);
  };

  const confirmCancelOrder = async () => {
    if (!orderToCancel) return;

    setCancellingOrder(orderToCancel);
    setShowCancelModal(false);
    
    try {
      const response = await fetch(`${API_BASE}/orders/${orderToCancel}/cancel`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();
      
      if (data.success) {
        // Update local state
        setOrders(orders.map(order => 
          order.order_id === orderToCancel 
            ? { ...order, status: 'cancelled' }
            : order
        ));
        alert('Order cancelled successfully');
      } else {
        alert('Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Error cancelling order');
    } finally {
      setCancellingOrder(null);
      setOrderToCancel(null);
    }
  };

  const closeCancelModal = () => {
    setShowCancelModal(false);
    setOrderToCancel(null);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'delivered':
        return 'success';
      case 'processing':
      case 'shipped':
        return 'warning';
      case 'cancelled':
        return 'danger';
      case 'pending':
        return 'info';
      default:
        return 'default';
    }
  };

  const getTrackingSteps = (status) => {
    const steps = [
      { label: 'Order Placed', status: 'completed' },
      { label: 'Processing', status: 'completed' },
      { label: 'Shipped', status: 'pending' },
      { label: 'Delivered', status: 'pending' }
    ];

    const statusLower = status.toLowerCase();
    
    if (statusLower === 'cancelled') {
      return steps.map((step, idx) => ({
        ...step,
        status: idx === 0 ? 'completed' : 'cancelled'
      }));
    }

    if (statusLower === 'completed' || statusLower === 'delivered') {
      return steps.map(step => ({ ...step, status: 'completed' }));
    }

    if (statusLower === 'shipped') {
      steps[2].status = 'completed';
      steps[1].status = 'completed';
    }

    if (statusLower === 'processing') {
      steps[1].status = 'completed';
    }

    return steps;
  };

  const canCancelOrder = (order) => {
    const status = order.status.toLowerCase();
    return status !== 'cancelled' && status !== 'delivered' && status !== 'shipped';
  };

  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-loading">
          <div className="loading-spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      {/* Animated Background Shapes */}
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        
        {/* Fashion & Arts Icons */}
        <div className="floating-icon icon-1">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
          </svg>
        </div>
        <div className="floating-icon icon-2">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
        </div>
        <div className="floating-icon icon-3">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
          </svg>
        </div>
        <div className="floating-icon icon-4">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
            <line x1="7" y1="7" x2="7.01" y2="7"/>
          </svg>
        </div>
        <div className="floating-icon icon-5">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="6"/>
            <circle cx="12" cy="12" r="2"/>
          </svg>
        </div>
        <div className="floating-icon icon-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </div>
        <div className="floating-icon icon-7">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 19l7-7 3 3-7 7-3-3z"/>
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
            <path d="M2 2l7.586 7.586"/>
            <circle cx="11" cy="11" r="2"/>
          </svg>
        </div>
        <div className="floating-icon icon-8">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </div>
        <div className="floating-icon icon-9">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        </div>
        <div className="floating-icon icon-10">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="8" r="7"/>
            <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.11"/>
          </svg>
        </div>
        <div className="floating-icon icon-11">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
        <div className="floating-icon icon-12">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <path d="M21 15l-5-5L5 21"/>
          </svg>
        </div>
        <div className="floating-icon icon-13">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <div className="floating-icon icon-14">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </div>
        <div className="floating-icon icon-15">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
            <line x1="7" y1="7" x2="7.01" y2="7"/>
          </svg>
        </div>
        <div className="floating-icon icon-16">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
        </div>
      </div>

      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track and manage your orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
            <path d="M9 11H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-2M9 11V7a3 3 0 1 1 6 0v4M9 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h2>No Orders Yet</h2>
          <p>Start shopping to see your orders here</p>
          <button className="shop-now-btn" onClick={() => navigate('/')}>
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="orders-container">
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div className="order-id-section">
                    <span className="order-label">Order ID:</span>
                    <span className="order-id-value">{order.order_id}</span>
                  </div>
                  <span className={`order-status-badge ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                <div className="order-card-body">
                  <div className="order-info-row">
                    <div className="order-info-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                        <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span>{new Date(order.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="order-info-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M20 7h-4V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM10 5h4v2h-4V5z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span>{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                    </div>
                    <div className="order-info-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span className="order-total">{formatINR(parseFloat(order.total))}</span>
                    </div>
                  </div>

                  <div className="order-items-preview">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="order-item-preview">
                        <img src={item.image} alt={item.name} />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="order-item-more">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                </div>

                <div className="order-card-footer">
                  <button 
                    className="btn-view-details"
                    onClick={() => setSelectedOrder(selectedOrder === order.order_id ? null : order.order_id)}
                  >
                    {selectedOrder === order.order_id ? 'Hide Details' : 'View Details'}
                  </button>
                  {canCancelOrder(order) && (
                    <button 
                      className="btn-cancel-order"
                      onClick={() => handleCancelOrder(order.order_id)}
                      disabled={cancellingOrder === order.order_id}
                    >
                      {cancellingOrder === order.order_id ? 'Cancelling...' : 'Cancel Order'}
                    </button>
                  )}
                </div>

                {selectedOrder === order.order_id && (
                  <div className="order-details-expanded">
                    {/* Tracking Timeline */}
                    <div className="order-tracking">
                      <h3>Order Tracking</h3>
                      <div className="tracking-timeline">
                        {getTrackingSteps(order.status).map((step, idx) => (
                          <div key={idx} className={`tracking-step ${step.status}`}>
                            <div className="tracking-step-icon">
                              {step.status === 'completed' ? '✓' : step.status === 'cancelled' ? '✕' : idx + 1}
                            </div>
                            <div className="tracking-step-label">{step.label}</div>
                            {idx < 3 && <div className="tracking-step-line"></div>}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="order-items-full">
                      <h3>Items</h3>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="order-item-full">
                          <img src={item.image} alt={item.name} />
                          <div className="order-item-details">
                            <h4>{item.name}</h4>
                            <p>Size: {item.size} | Qty: {item.quantity}</p>
                          </div>
                          <div className="order-item-price">
                            {formatINR(parseFloat(item.price * item.quantity))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Address */}
                    <div className="order-shipping">
                      <h3>Shipping Address</h3>
                      <p>{order.shipping_info.fullName}</p>
                      <p>{order.shipping_info.address}</p>
                      <p>{order.shipping_info.city}, {order.shipping_info.state} {order.shipping_info.zip}</p>
                      <p>{order.shipping_info.country}</p>
                    </div>

                    {/* Payment Summary */}
                    <div className="order-payment-summary">
                      <h3>Payment Summary</h3>
                      <div className="payment-row">
                        <span>Subtotal:</span>
                        <span>{formatINR(parseFloat(order.subtotal))}</span>
                      </div>
                      <div className="payment-row">
                        <span>Shipping:</span>
                        <span>{formatINR(parseFloat(order.shipping))}</span>
                      </div>
                      <div className="payment-row">
                        <span>Tax:</span>
                        <span>{formatINR(parseFloat(order.tax))}</span>
                      </div>
                      <div className="payment-row total">
                        <span>Total:</span>
                        <span>{formatINR(parseFloat(order.total))}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cancel Order Modal */}
      {showCancelModal && (
        <div className="cancel-modal-overlay" onClick={closeCancelModal}>
          <div className="cancel-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cancel-modal-header">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#dc3545" strokeWidth="2"/>
                <line x1="15" y1="9" x2="9" y2="15" stroke="#dc3545" strokeWidth="2"/>
                <line x1="9" y1="9" x2="15" y2="15" stroke="#dc3545" strokeWidth="2"/>
              </svg>
              <h2>Cancel Order</h2>
            </div>
            <div className="cancel-modal-body">
              <p>Are you sure you want to cancel this order?</p>
              <p className="cancel-modal-warning">This action cannot be undone.</p>
            </div>
            <div className="cancel-modal-footer">
              <button className="cancel-modal-btn cancel-btn-no" onClick={closeCancelModal}>
                No, Keep Order
              </button>
              <button className="cancel-modal-btn cancel-btn-yes" onClick={confirmCancelOrder}>
                Yes, Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
