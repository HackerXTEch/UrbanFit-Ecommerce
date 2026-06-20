import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatINR } from '../utils/currency';
import './Checkout.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart, getCartTotal } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    method: 'credit_card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentChange = (e) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(async () => {
      try {
        // Create order in database
        const orderData = {
          userId: user?.id || null,
          email: shippingInfo.email,
          shippingInfo,
          paymentMethod: paymentInfo.method,
          items: cart,
          subtotal: getCartTotal(),
          shipping: 10,
          tax: getCartTotal() * 0.1,
          total: getCartTotal() + 10 + (getCartTotal() * 0.1),
          status: 'completed'
        };

        const response = await fetch(`${API_BASE}/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        });

        const data = await response.json();

        if (data.success) {
          setOrderId(data.orderId);
          setStep(3);
          clearCart();
        } else {
          alert('Failed to create order. Please try again.');
        }
      } catch (error) {
        console.error('Order creation error:', error);
        alert('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  const formatCardNumber = (value) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16));
    setPaymentInfo({ ...paymentInfo, cardNumber: formatted });
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setPaymentInfo({ ...paymentInfo, expiryDate: value });
  };

  const downloadPaymentSlip = () => {
    // Create a simple text receipt
    const slip = `
═══════════════════════════════════════
          PAYMENT RECEIPT
═══════════════════════════════════════

Order ID: #${orderId}
Date: ${new Date().toLocaleString()}

CUSTOMER INFORMATION
───────────────────────────────────────
Name: ${shippingInfo.fullName}
Email: ${shippingInfo.email}
Phone: ${shippingInfo.phone}

SHIPPING ADDRESS
───────────────────────────────────────
${shippingInfo.address}
${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zipCode}
${shippingInfo.country}

ORDER DETAILS
───────────────────────────────────────
${cart.map(item => `${item.name} x${item.quantity} - ${formatINR(item.price * item.quantity)}`).join('\n')}

PAYMENT SUMMARY
───────────────────────────────────────
Subtotal:        ${formatINR(getCartTotal())}
Shipping:        ₹840
Tax (10%):       ${formatINR(getCartTotal() * 0.1)}
───────────────────────────────────────
TOTAL:           ${formatINR(getCartTotal() + 840 + (getCartTotal() * 0.1))}

Payment Method: ${paymentInfo.method.replace('_', ' ').toUpperCase()}
Status: PAID

═══════════════════════════════════════
        Thank you for your purchase!
           www.urbanfit.com
═══════════════════════════════════════
    `;

    const blob = new Blob([slip], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payment-receipt-${orderId}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="empty-cart">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
              <circle cx="9" cy="21" r="1" stroke="currentColor" strokeWidth="2"/>
              <circle cx="20" cy="21" r="1" stroke="currentColor" strokeWidth="2"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2>Your cart is empty</h2>
            <p>Add items to your cart before checkout</p>
            <button className="btn-primary" onClick={() => navigate('/')}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Progress Steps */}
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <div className="step-number">1</div>
            <span className="step-label">Shipping</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <div className="step-number">2</div>
            <span className="step-label">Payment</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <span className="step-label">Confirmation</span>
          </div>
        </div>

        <div className="checkout-content">
          {/* Step 1: Shipping Information */}
          {step === 1 && (
            <div className="checkout-section shipping-section">
              <h2 className="section-title">Shipping Information</h2>
              <form onSubmit={handleShippingSubmit} className="checkout-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={handleShippingChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleShippingChange}
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                      required
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div className="form-group">
                    <label>Country *</label>
                    <select
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleShippingChange}
                      required
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                    required
                    placeholder="123 Main Street, Apt 4B"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      required
                      placeholder="New York"
                    />
                  </div>
                  <div className="form-group">
                    <label>State/Province *</label>
                    <input
                      type="text"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingChange}
                      required
                      placeholder="NY"
                    />
                  </div>
                  <div className="form-group">
                    <label>ZIP/Postal Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleShippingChange}
                      required
                      placeholder="10001"
                    />
                  </div>
                </div>

                <button type="submit" className="btn-continue">
                  Continue to Payment
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Payment Information */}
          {step === 2 && (
            <div className="checkout-section payment-section">
              <h2 className="section-title">Payment Information</h2>
              
              <div className="payment-methods">
                <label className={`payment-method ${paymentInfo.method === 'credit_card' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="method"
                    value="credit_card"
                    checked={paymentInfo.method === 'credit_card'}
                    onChange={handlePaymentChange}
                  />
                  <div className="method-content">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <rect x="1" y="4" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M1 10h22" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>Credit Card</span>
                  </div>
                </label>

                <label className={`payment-method ${paymentInfo.method === 'paypal' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="method"
                    value="paypal"
                    checked={paymentInfo.method === 'paypal'}
                    onChange={handlePaymentChange}
                  />
                  <div className="method-content">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-1.41-1.41L10.17 14H7v-2h3.17l-1.58-1.59L10 9l4 4-4 4z" fill="currentColor"/>
                    </svg>
                    <span>PayPal</span>
                  </div>
                </label>

                <label className={`payment-method ${paymentInfo.method === 'cash_on_delivery' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="method"
                    value="cash_on_delivery"
                    checked={paymentInfo.method === 'cash_on_delivery'}
                    onChange={handlePaymentChange}
                  />
                  <div className="method-content">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Cash on Delivery</span>
                  </div>
                </label>
              </div>

              {paymentInfo.method === 'credit_card' && (
                <form onSubmit={handlePaymentSubmit} className="checkout-form payment-form">
                  <div className="form-group">
                    <label>Card Number *</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={handleCardNumberChange}
                      required
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                    />
                  </div>

                  <div className="form-group">
                    <label>Cardholder Name *</label>
                    <input
                      type="text"
                      name="cardName"
                      value={paymentInfo.cardName}
                      onChange={handlePaymentChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date *</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={handleExpiryChange}
                        required
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV *</label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                        required
                        placeholder="123"
                        maxLength="3"
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn-back" onClick={() => setStep(1)}>
                      Back
                    </button>
                    <button type="submit" className="btn-pay" disabled={loading}>
                      {loading ? 'Processing...' : `Pay ${formatINR(getCartTotal() + 840 + (getCartTotal() * 0.1))}`}
                    </button>
                  </div>
                </form>
              )}

              {(paymentInfo.method === 'paypal' || paymentInfo.method === 'cash_on_delivery') && (
                <form onSubmit={handlePaymentSubmit} className="checkout-form">
                  <div className="payment-info-box">
                    {paymentInfo.method === 'paypal' && (
                      <p>You will be redirected to PayPal to complete your payment securely.</p>
                    )}
                    {paymentInfo.method === 'cash_on_delivery' && (
                      <p>You will pay in cash when your order is delivered.</p>
                    )}
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn-back" onClick={() => setStep(1)}>
                      Back
                    </button>
                    <button type="submit" className="btn-pay" disabled={loading}>
                      {loading ? 'Processing...' : 'Complete Order'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Step 3: Order Confirmation */}
          {step === 3 && (
            <div className="checkout-section confirmation-section">
              <div className="success-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#27ae60" strokeWidth="2" fill="none"/>
                  <path d="M8 12l2 2 4-4" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              <h2 className="confirmation-title">Order Placed Successfully!</h2>
              <p className="confirmation-subtitle">Thank you for your purchase</p>
              
              <div className="order-summary">
                <div className="order-id">
                  <span className="label">Order ID:</span>
                  <span className="value">#{orderId}</span>
                </div>
                <div className="order-date">
                  <span className="label">Date:</span>
                  <span className="value">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="order-total">
                  <span className="label">Total Paid:</span>
                  <span className="value">{formatINR(getCartTotal() + 840 + (getCartTotal() * 0.1))}</span>
                </div>
              </div>

              <div className="order-items">
                <h3>Order Items</h3>
                {cart.map((item) => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <div className="item-price">{formatINR(item.price * item.quantity)}</div>
                  </div>
                ))}
              </div>

              <div className="confirmation-actions">
                <button className="btn-download" onClick={downloadPaymentSlip}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Download Receipt
                </button>
                <button className="btn-primary" onClick={() => navigate('/')}>
                  Continue Shopping
                </button>
              </div>

              <p className="confirmation-note">
                A confirmation email has been sent to {shippingInfo.email}
              </p>
            </div>
          )}

          {/* Order Summary Sidebar */}
          {step !== 3 && (
            <div className="order-summary-sidebar">
              <h3>Order Summary</h3>
              <div className="summary-items">
                {cart.map((item) => (
                  <div key={item.id} className="summary-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>Qty: {item.quantity}</p>
                    </div>
                    <span className="item-total">{formatINR(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              <div className="summary-calculations">
                <div className="calc-row">
                  <span>Subtotal</span>
                  <span>{formatINR(getCartTotal())}</span>
                </div>
                <div className="calc-row">
                  <span>Shipping</span>
                  <span>₹840</span>
                </div>
                <div className="calc-row">
                  <span>Tax (10%)</span>
                  <span>{formatINR(getCartTotal() * 0.1)}</span>
                </div>
                <div className="calc-row total">
                  <span>Total</span>
                  <span>{formatINR(getCartTotal() + 840 + (getCartTotal() * 0.1))}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
