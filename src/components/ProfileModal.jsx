import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ProfileModal.css';

const API_BASE = 'http://localhost:3001';

const ProfileModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user, logout, updateUser, changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  
  
  // Password change state
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const achievements = [
    { icon: '🏆', title: 'Fashion Explorer', description: 'Ordered from 5+ categories' },
    { icon: '💎', title: 'VIP Member', description: 'Spent over $1000' },
    { icon: '⭐', title: 'Loyal Customer', description: 'Member for 1+ year' },
    { icon: '🎯', title: 'Trendsetter', description: 'Early adopter of new arrivals' }
  ];

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/login');
  };

  const handleEditProfile = () => {
    setEditForm({
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || ''
    });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({
      fullName: '',
      email: '',
      phone: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Image upload removed: profile images not editable from profile modal

  const handleSaveProfile = () => {
    // Update user data
    updateUser(editForm);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
    setPasswordMessage(null);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordMessage(null);

    // Validation
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match!' });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Password must be at least 6 characters!' });
      return;
    }

    setPasswordLoading(true);

    try {
      const result = await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      
      if (result.success) {
        setPasswordMessage({ type: 'success', text: result.message || 'Password changed successfully!' });
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        
        // Close password change form after 2 seconds
        setTimeout(() => {
          setIsChangingPassword(false);
          setPasswordMessage(null);
        }, 2000);
      } else {
        setPasswordMessage({ type: 'error', text: result.message || 'Failed to change password' });
      }
    } catch {
      setPasswordMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleCancelPasswordChange = () => {
    setIsChangingPassword(false);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordMessage(null);
  };

  // Format date from timestamp
  const getMemberSince = () => {
    if (!user) return 'N/A';
    // You can enhance this to get actual join date from user data
    return 'Recently joined';
  };

  // Default values if user data is missing
  const userProfile = {
    name: user?.fullName || 'Guest User',
    email: user?.email || 'guest@example.com',
    phone: user?.phone || 'Not provided',
    avatar: null,
    memberSince: getMemberSince(),
    orders: 0,
    points: 0
  };

  const getInitials = (name) => {
    if (!name) return 'G';
    const parts = name.trim().split(/\s+/);
    const initials = parts.slice(0,2).map(p => p[0]?.toUpperCase() || '').join('');
    return initials || 'G';
  };

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="profile-header">
          <div className="profile-info">
            <div className="avatar">
              {userProfile.avatar ? (
                <img src={userProfile.avatar} alt={userProfile.name} />
              ) : (
                <div className="avatar-initials">{getInitials(userProfile.name)}</div>
              )}
              <div className="online-status"></div>
            </div>
            <div className="user-details">
              <h2 className="user-name">{userProfile.name}</h2>
              <p className="user-email">{userProfile.email}</p>
              <span className="member-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                </svg>
                {userProfile.memberSince}
              </span>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-number">{userProfile.orders}</span>
            <span className="stat-label">Orders</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{userProfile.points}</span>
            <span className="stat-label">Points</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">5.0</span>
            <span className="stat-label">Rating</span>
          </div>
        </div>

        <div className="profile-tabs">
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Profile
          </button>
          <button 
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            Orders
          </button>
          <button 
            className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveTab('achievements')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Rewards
          </button>
        </div>

        <div className="profile-content">
          {activeTab === 'profile' && (
            <div className="profile-tab">
              {isEditing ? (
                // Edit Mode
                <div className="edit-profile-form">
                  {/* Profile picture editing removed — avatars use initials or stored image only */}

                  <div className="profile-section">
                    <h3>Personal Information</h3>
                    <div className="edit-form-grid">
                      <div className="form-field">
                        <label>Full Name</label>
                        <input 
                          type="text" 
                          name="fullName"
                          value={editForm.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="form-field">
                        <label>Email</label>
                        <input 
                          type="email" 
                          name="email"
                          value={editForm.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="form-field">
                        <label>Phone</label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={editForm.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="edit-actions">
                    <button className="cancel-edit-btn" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                    <button className="save-edit-btn" onClick={handleSaveProfile}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <div className="profile-section">
                    <h3>Personal Information</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Full Name</label>
                        <span>{userProfile.name}</span>
                      </div>
                      <div className="info-item">
                        <label>Email</label>
                        <span>{userProfile.email}</span>
                      </div>
                      <div className="info-item">
                        <label>Phone</label>
                        <span>{userProfile.phone}</span>
                      </div>
                      <div className="info-item">
                        <label>Member Since</label>
                        <span>{userProfile.memberSince}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="profile-section">
                    <h3>Security</h3>
                    {!isChangingPassword ? (
                      <button className="change-password-btn" onClick={() => setIsChangingPassword(true)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Change Password
                      </button>
                    ) : (
                      <div className="password-change-form">
                        <form onSubmit={handleChangePassword}>
                          <div className="form-field">
                            <label>Current Password</label>
                            <input 
                              type="password"
                              name="currentPassword"
                              value={passwordForm.currentPassword}
                              onChange={handlePasswordInputChange}
                              placeholder="Enter current password"
                              required
                            />
                          </div>
                          <div className="form-field">
                            <label>New Password</label>
                            <input 
                              type="password"
                              name="newPassword"
                              value={passwordForm.newPassword}
                              onChange={handlePasswordInputChange}
                              placeholder="Enter new password"
                              required
                              minLength={6}
                            />
                          </div>
                          <div className="form-field">
                            <label>Confirm New Password</label>
                            <input 
                              type="password"
                              name="confirmPassword"
                              value={passwordForm.confirmPassword}
                              onChange={handlePasswordInputChange}
                              placeholder="Confirm new password"
                              required
                              minLength={6}
                            />
                          </div>
                          
                          {passwordMessage && (
                            <div className={`password-message ${passwordMessage.type}`}>
                              {passwordMessage.text}
                            </div>
                          )}
                          
                          <div className="password-actions">
                            <button 
                              type="button" 
                              className="cancel-password-btn" 
                              onClick={handleCancelPasswordChange}
                              disabled={passwordLoading}
                            >
                              Cancel
                            </button>
                            <button 
                              type="submit" 
                              className="save-password-btn"
                              disabled={passwordLoading}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              {passwordLoading ? 'Changing...' : 'Change Password'}
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>

                  <div className="profile-section">
                    <h3>Preferences</h3>
                    <div className="preference-item">
                      <span>Email Notifications</span>
                      <label className="toggle">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <div className="preference-item">
                      <span>SMS Updates</span>
                      <label className="toggle">
                        <input type="checkbox" />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <div className="preference-item">
                      <span>Marketing Emails</span>
                      <label className="toggle">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="orders-tab">
              <div className="orders-redirect">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                  <path d="M9 11H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-2M9 11V7a3 3 0 1 1 6 0v4M9 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3>View Your Orders</h3>
                <p>Track and manage all your orders in one place</p>
                <button className="view-orders-page-btn" onClick={() => { onClose(); navigate('/orders'); }}>
                  Go to Orders Page
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="achievements-tab">
              <div className="points-summary">
                <div className="points-card">
                  <h3>Loyalty Points</h3>
                  <div className="points-amount">{userProfile.points}</div>
                  <p>$0.00 value • Next reward at 1500 points</p>
                  <div className="progress-bar">
                    <div className="progress" style={{width: `${(userProfile.points / 1500) * 100}%`}}></div>
                  </div>
                </div>
              </div>
              
              <div className="achievements-grid">
                {achievements.map((achievement, index) => (
                  <div key={index} className="achievement-card">
                    <div className="achievement-icon">{achievement.icon}</div>
                    <h4>{achievement.title}</h4>
                    <p>{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="profile-actions">
          <button className="edit-profile-btn" onClick={handleEditProfile}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Edit Profile
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
