import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Image uploads removed for registration; profile images handled in-profile only

  async function submit(e) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const payload = mode === 'login' 
        ? { email, password }
        : { fullName, email, phone, password };

      const res = await fetch(`${API_BASE}/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        // Special handling for user already exists
        if (res.status === 409 && mode === 'register') {
          setMessage({ 
            type: 'error', 
            text: 'This email is already registered. Please login instead.' 
          });
          // Optionally switch to login mode after a delay
          setTimeout(() => {
            setMode('login');
            setMessage(null);
          }, 3000);
        } else {
          setMessage({ type: 'error', text: data.error || 'Request failed' });
        }
      } else {
        setMessage({ type: 'success', text: mode === 'login' ? 'Logged in successfully!' : 'Registered successfully!' });
        
        // Save user data and redirect to home
        login({ 
          id: data.id, 
          email: data.email || email,
          fullName: data.fullName || fullName,
          phone: data.phone || phone,
          profilePic: null
        });
        
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      {/* Animated Background */}
      <div className="login-background">
        <div className="animated-circles">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
          <div className="circle circle-4"></div>
          <div className="circle circle-5"></div>
        </div>
        
        <div className="animated-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        <div className="floating-icons">
          <div className="icon-wrapper icon-1">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" opacity="0.6"/>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <div className="icon-wrapper icon-2">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="icon-wrapper icon-3">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor"/>
            </svg>
          </div>
          <div className="icon-wrapper icon-4">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Brand Logo */}
      <div className="login-brand">
        <h1>UrbanFit</h1>
        <p>Style Your Life</p>
      </div>

      {/* Auth Card */}
      <div className="auth-card">
        <div className="auth-header">
          <h2>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{mode === 'login' ? 'Sign in to continue' : 'Join UrbanFit today'}</p>
        </div>

        <div className="auth-tabs">
          <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Login</button>
          <button className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>Register</button>
        </div>

        <form className="auth-form" onSubmit={submit}>
          {mode === 'register' && (
            <>
              <label>
                Full Name
                <input 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} 
                  type="text" 
                  placeholder="John Doe"
                  required 
                />
              </label>

              <label>
                Phone Number
                <input 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  type="tel" 
                  placeholder="+1 234 567 8900"
                  required 
                />
              </label>

              {/* Profile picture upload removed from registration; avatars use initials */}
            </>
          )}

          <label>
            Email
            <input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              type="email" 
              placeholder="your@email.com"
              required 
            />
          </label>

          <label>
            Password
            <input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              placeholder="••••••••"
              required 
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Please wait...' : (mode === 'login' ? 'Login' : 'Register')}
          </button>

          {message && (
            <div className={`auth-message ${message.type}`}>{message.text}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
