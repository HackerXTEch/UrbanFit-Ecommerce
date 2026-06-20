import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { createUser, getUserByEmail, updateUserPassword } from './db.js';
import { 
  getAllProducts, 
  getProductsByType, 
  getProductsByTypeAndCategory, 
  getProductById, 
  getFeaturedProducts 
} from './productsDb.js';
import { 
  createOrder, 
  getOrdersByUserId, 
  getOrdersByEmail, 
  getOrderById,
  updateOrderStatus
} from './ordersDb.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Register
app.post('/register', async (req, res) => {
  try {
    console.log('Register request received:', req.body);
    const { fullName, email, phone, profilePic, password } = req.body || {};
    
    if (!fullName || !email || !phone || !password) {
      console.log('Validation failed:', { fullName: !!fullName, email: !!email, phone: !!phone, password: !!password });
      return res.status(400).json({ error: 'Full name, email, phone, and password are required' });
    }

    console.log('Checking for existing user...');
    const existing = await getUserByEmail(email).catch(() => null);
    if (existing) {
      console.log('User already exists:', email);
      return res.status(409).json({ error: 'User already exists' });
    }

    console.log('Hashing password...');
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    
    console.log('Creating user in database...');
    const created = await createUser(fullName, email, phone, profilePic || null, hash);
    
    console.log('User created successfully:', created.id);
    res.json({ 
      success: true, 
      id: created.id,
      fullName,
      email,
      phone,
      profilePic: profilePic || null
    });
  } catch (err) {
    console.error('Register error', err);
    res.status(500).json({ 
      error: 'Internal server error',
      message: err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const user = await getUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const matches = bcrypt.compareSync(password, user.password_hash);
    if (!matches) return res.status(401).json({ error: 'Invalid credentials' });

    // For this minimal setup we return a simple success message. You can add JWT/session later.
    res.json({ 
      success: true, 
      id: user.id, 
      email: user.email,
      fullName: user.full_name,
      phone: user.phone,
      profilePic: user.profile_pic
    });
  } catch (err) {
    console.error('Login error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Change Password
app.post('/change-password', async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body || {};
    
    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Email, current password, and new password are required' });
    }

    // Verify user exists
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const matches = bcrypt.compareSync(currentPassword, user.password_hash);
    if (!matches) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const salt = bcrypt.genSaltSync(10);
    const newHash = bcrypt.hashSync(newPassword, salt);

    // Update password
    await updateUserPassword(email, newHash);

    res.json({ 
      success: true, 
      message: 'Password changed successfully'
    });
  } catch (err) {
    console.error('Change password error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ========== PRODUCT ENDPOINTS ==========

// Get featured products (trending or on sale) - must be before other routes
app.get('/api/products/featured', (req, res) => {
  getFeaturedProducts((err, products) => {
    if (err) {
      console.error('Error fetching featured products:', err);
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
    res.json({ success: true, products });
  });
});

// Get single product by ID
app.get('/api/products/id/:id', (req, res) => {
  const { id } = req.params;
  getProductById(id, (err, product) => {
    if (err) {
      console.error('Error fetching product by ID:', err);
      return res.status(500).json({ error: 'Failed to fetch product' });
    }
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ success: true, product });
  });
});

// Get all products
app.get('/api/products', (req, res) => {
  getAllProducts((err, products) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
    res.json({ success: true, products });
  });
});

// Get products by type (men, women, kids)
app.get('/api/products/:type', (req, res) => {
  const { type } = req.params;
  
  // Check if this is a category filter
  if (req.query.category) {
    const category = req.query.category;
    getProductsByTypeAndCategory(type, category, (err, products) => {
      if (err) {
        console.error('Error fetching products by type and category:', err);
        return res.status(500).json({ error: 'Failed to fetch products' });
      }
      res.json({ success: true, products });
    });
  } else {
    getProductsByType(type, (err, products) => {
      if (err) {
        console.error('Error fetching products by type:', err);
        return res.status(500).json({ error: 'Failed to fetch products' });
      }
      res.json({ success: true, products });
    });
  }
});

// ========== ORDER ENDPOINTS ==========

// Create new order
app.post('/orders', async (req, res) => {
  try {
    const orderData = req.body;
    
    if (!orderData.email || !orderData.items || orderData.items.length === 0) {
      return res.status(400).json({ error: 'Email and items are required' });
    }

    const result = await createOrder(orderData);
    res.json({ 
      success: true, 
      orderId: result.orderId,
      message: 'Order created successfully'
    });
  } catch (err) {
    console.error('Create order error:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get orders by user ID
app.get('/orders/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await getOrdersByUserId(userId);
    res.json({ success: true, orders });
  } catch (err) {
    console.error('Get orders error:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get orders by email
app.get('/orders/email/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await getOrdersByEmail(email);
    res.json({ success: true, orders });
  } catch (err) {
    console.error('Get orders error:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get single order by order ID
app.get('/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await getOrderById(orderId);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json({ success: true, order });
  } catch (err) {
    console.error('Get order error:', err);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Cancel order
app.put('/orders/:orderId/cancel', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await getOrderById(orderId);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if order can be cancelled
    const status = order.status.toLowerCase();
    if (status === 'cancelled' || status === 'delivered' || status === 'shipped') {
      return res.status(400).json({ 
        error: 'Cannot cancel order',
        message: `Orders with status "${order.status}" cannot be cancelled`
      });
    }

    // Update order status to cancelled
    await updateOrderStatus(orderId, 'cancelled');

    res.json({ 
      success: true, 
      message: 'Order cancelled successfully'
    });
  } catch (err) {
    console.error('Cancel order error:', err);
    res.status(500).json({ error: 'Failed to cancel order' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
