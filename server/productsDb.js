import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database path
const dbPath = path.join(__dirname, 'products.db');

// Create and initialize database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening products database:', err.message);
  } else {
    console.log('Connected to products database.');
    initializeDatabase();
  }
});

// Initialize database schema
function initializeDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT NOT NULL,
      product_name TEXT NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      original_price REAL,
      stars INTEGER NOT NULL,
      rating REAL NOT NULL,
      reviews INTEGER NOT NULL,
      type TEXT NOT NULL,
      category TEXT NOT NULL,
      is_on_sale BOOLEAN DEFAULT 0,
      is_trending BOOLEAN DEFAULT 0,
      is_available BOOLEAN DEFAULT 1,
      badge TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating products table:', err.message);
    } else {
      console.log('Products table initialized.');
      // Add is_available column to existing table if it doesn't exist
      db.run(`ALTER TABLE products ADD COLUMN is_available BOOLEAN DEFAULT 1`, (err) => {
        if (err && !err.message.includes('duplicate column')) {
          console.error('Error adding is_available column:', err.message);
        }
      });
      checkAndSeedData();
    }
  });
}

// Check if data exists, if not seed the database
function checkAndSeedData() {
  db.get('SELECT COUNT(*) as count FROM products', (err, row) => {
    if (err) {
      console.error('Error checking products:', err.message);
    } else if (row.count === 0) {
      console.log('No products found. Seeding database...');
      seedDatabase();
    } else {
      console.log(`Database already contains ${row.count} products.`);
    }
  });
}

// Seed database with all products
function seedDatabase() {
  const products = [
    // Men's Formal Wear
    {
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Executive Business Suit',
      description: 'Charcoal wool blend, tailored fit',
      price: 599.99,
      original_price: null,
      stars: 5,
      rating: 4.9,
      reviews: 0,
      type: 'men',
      category: 'formal',
      badge: 'Premium'
    },
    {
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Premium Dress Shirt',
      description: 'Egyptian cotton, classic fit',
      price: 89.99,
      original_price: null,
      stars: 4,
      rating: 4.7,
      reviews: 0,
      type: 'men',
      category: 'formal',
      badge: 'New'
    },
    {
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Silk Business Tie',
      description: '100% silk, classic patterns',
      price: 49.99,
      original_price: null,
      stars: 5,
      rating: 4.8,
      reviews: 0,
      type: 'men',
      category: 'formal',
      badge: null
    },
    {
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Oxford Dress Shoes',
      description: 'Genuine leather, handcrafted',
      price: 149.99,
      original_price: 199.99,
      stars: 5,
      rating: 4.9,
      reviews: 0,
      type: 'men',
      category: 'formal',
      badge: 'Sale',
      is_on_sale: 1
    },
    {
      image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Executive Accessories Set',
      description: 'Watch, belt, cufflinks combo',
      price: 129.99,
      original_price: null,
      stars: 4,
      rating: 4.6,
      reviews: 0,
      type: 'men',
      category: 'formal',
      badge: null
    },
    {
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Navy Sport Blazer',
      description: 'Wool blend, modern fit',
      price: 299.99,
      original_price: null,
      stars: 5,
      rating: 4.8,
      reviews: 0,
      type: 'men',
      category: 'formal',
      badge: 'Trending',
      is_trending: 1
    },
    
    // Men's Casual Wear
    {
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Premium Cotton T-Shirt',
      description: '100% organic cotton, relaxed fit',
      price: 29.99,
      original_price: null,
      stars: 5,
      rating: 4.8,
      reviews: 0,
      type: 'men',
      category: 'casual',
      badge: 'Bestseller'
    },
    {
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Classic Denim Jeans',
      description: 'Stretch denim, slim fit',
      price: 79.99,
      original_price: null,
      stars: 4,
      rating: 4.6,
      reviews: 0,
      type: 'men',
      category: 'casual',
      badge: 'New'
    },
    {
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Classic Polo Shirt',
      description: 'Pique cotton, regular fit',
      price: 49.99,
      original_price: null,
      stars: 5,
      rating: 4.7,
      reviews: 0,
      type: 'men',
      category: 'casual',
      badge: null
    },
    {
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Casual Sneakers',
      description: 'Canvas & leather, comfortable sole',
      price: 69.99,
      original_price: 89.99,
      stars: 5,
      rating: 4.9,
      reviews: 0,
      type: 'men',
      category: 'casual',
      badge: 'Sale',
      is_on_sale: 1
    },
    {
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Casual Chino Shorts',
      description: 'Cotton twill, 9-inch inseam',
      price: 39.99,
      original_price: null,
      stars: 4,
      rating: 4.5,
      reviews: 0,
      type: 'men',
      category: 'casual',
      badge: null
    },
    {
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Comfort Hoodie',
      description: 'Fleece blend, kangaroo pocket',
      price: 59.99,
      original_price: null,
      stars: 5,
      rating: 4.8,
      reviews: 0,
      type: 'men',
      category: 'casual',
      badge: 'Trending',
      is_trending: 1
    },
    {
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Casual Button-Up',
      description: 'Cotton blend, relaxed fit',
      price: 69.99,
      original_price: null,
      stars: 4,
      rating: 4.4,
      reviews: 0,
      type: 'men',
      category: 'casual',
      badge: null
    },
    {
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Bomber Jacket',
      description: 'Lightweight, zip closure',
      price: 89.99,
      original_price: null,
      stars: 5,
      rating: 4.7,
      reviews: 0,
      type: 'men',
      category: 'casual',
      badge: null
    },
    
    // Men's Sportswear
    {
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Performance Athletic T-Shirt',
      description: 'Moisture-wicking fabric, breathable mesh',
      price: 39.99,
      original_price: null,
      stars: 5,
      rating: 4.8,
      reviews: 0,
      type: 'men',
      category: 'sports',
      badge: 'Performance'
    },
    {
      image: 'https://images.unsplash.com/photo-1506629905069-f8ec4e3a7d20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Training Shorts',
      description: 'Quick-dry fabric, 7-inch inseam',
      price: 34.99,
      original_price: null,
      stars: 4,
      rating: 4.6,
      reviews: 0,
      type: 'men',
      category: 'sports',
      badge: 'New'
    },
    {
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Performance Running Shoes',
      description: 'Lightweight, responsive cushioning',
      price: 129.99,
      original_price: null,
      stars: 5,
      rating: 4.9,
      reviews: 0,
      type: 'men',
      category: 'sports',
      badge: null
    },
    {
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Athletic Hoodie',
      description: 'Fleece-lined, moisture-wicking',
      price: 59.99,
      original_price: 79.99,
      stars: 5,
      rating: 4.7,
      reviews: 0,
      type: 'men',
      category: 'sports',
      badge: 'Sale',
      is_on_sale: 1
    },
    {
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Training Pants',
      description: 'Stretch fabric, tapered fit',
      price: 54.99,
      original_price: null,
      stars: 4,
      rating: 4.5,
      reviews: 0,
      type: 'men',
      category: 'sports',
      badge: null
    },
    {
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Athletic Tank Top',
      description: 'Ultra-lightweight, muscle fit',
      price: 24.99,
      original_price: null,
      stars: 5,
      rating: 4.8,
      reviews: 0,
      type: 'men',
      category: 'sports',
      badge: 'Trending',
      is_trending: 1
    },
    {
      image: 'https://images.unsplash.com/photo-1506629905069-f8ec4e3a7d20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Track Jacket',
      description: 'Wind-resistant, full zip',
      price: 69.99,
      original_price: null,
      stars: 4,
      rating: 4.4,
      reviews: 0,
      type: 'men',
      category: 'sports',
      badge: null
    },
    {
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Compression Tights',
      description: 'Muscle support, thermal regulation',
      price: 49.99,
      original_price: null,
      stars: 5,
      rating: 4.7,
      reviews: 0,
      type: 'men',
      category: 'sports',
      badge: null
    },
    
    // Women's Casual Wear
    {
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop',
      product_name: 'Casual Summer Dress',
      description: 'Lightweight fabric, perfect for summer',
      price: 49,
      original_price: 65,
      stars: 5,
      rating: 4.8,
      reviews: 124,
      type: 'women',
      category: 'casual',
      badge: 'Sale',
      is_on_sale: 1
    },
    {
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=500&fit=crop',
      product_name: 'Denim Jeans Classic',
      description: 'Classic fit, premium denim',
      price: 78,
      original_price: null,
      stars: 5,
      rating: 4.7,
      reviews: 89,
      type: 'women',
      category: 'casual',
      badge: 'Trending',
      is_trending: 1
    },
    {
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
      product_name: 'Casual T-Shirt White',
      description: 'Soft cotton, everyday wear',
      price: 25,
      original_price: 35,
      stars: 5,
      rating: 4.6,
      reviews: 203,
      type: 'women',
      category: 'casual',
      badge: 'Sale',
      is_on_sale: 1
    },
    {
      image: 'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=400&h=500&fit=crop',
      product_name: 'Comfortable Jeans',
      description: 'Stretch fit, all-day comfort',
      price: 85,
      original_price: null,
      stars: 5,
      rating: 4.9,
      reviews: 156,
      type: 'women',
      category: 'casual',
      badge: 'Trending',
      is_trending: 1
    },
    {
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop',
      product_name: 'Casual Cardigan',
      description: 'Cozy knit, perfect layering piece',
      price: 65,
      original_price: 85,
      stars: 4,
      rating: 4.5,
      reviews: 78,
      type: 'women',
      category: 'casual',
      badge: 'Sale',
      is_on_sale: 1
    },
    {
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop',
      product_name: 'Linen Casual Pants',
      description: 'Breathable linen, relaxed fit',
      price: 55,
      original_price: null,
      stars: 5,
      rating: 4.7,
      reviews: 92,
      type: 'women',
      category: 'casual',
      badge: null
    },
    {
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
      product_name: 'Casual Hoodie',
      description: 'Soft fleece, relaxed style',
      price: 45,
      original_price: 60,
      stars: 5,
      rating: 4.8,
      reviews: 167,
      type: 'women',
      category: 'casual',
      badge: 'Trending',
      is_on_sale: 1,
      is_trending: 1
    },
    {
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop',
      product_name: 'Casual White Dress',
      description: 'Versatile design, easy to style',
      price: 42,
      original_price: null,
      stars: 5,
      rating: 4.6,
      reviews: 134,
      type: 'women',
      category: 'casual',
      badge: null
    },
    {
      image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&h=500&fit=crop',
      product_name: 'Casual Shocks',
      description: 'Comfortable fit, stylish design',
      price: 38,
      original_price: 52,
      stars: 5,
      rating: 4.7,
      reviews: 98,
      type: 'women',
      category: 'casual',
      badge: 'Sale',
      is_on_sale: 1
    },
    
    // Women's Professional Wear
    {
      image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Executive Blazer',
      description: 'Tailored wool blend, perfect fit',
      price: 299.99,
      original_price: null,
      stars: 5,
      rating: 4.9,
      reviews: 0,
      type: 'women',
      category: 'professional',
      badge: 'Premium'
    },
    {
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Business Sheath Dress',
      description: 'Classic navy, knee-length',
      price: 189.99,
      original_price: null,
      stars: 4,
      rating: 4.7,
      reviews: 0,
      type: 'women',
      category: 'professional',
      badge: 'New'
    },
    {
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'High-Waist Pencil Skirt',
      description: 'Stretch fabric, comfortable fit',
      price: 89.99,
      original_price: null,
      stars: 5,
      rating: 4.8,
      reviews: 0,
      type: 'women',
      category: 'professional',
      badge: null
    },
    {
      image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Classic White Blouse',
      description: 'Cotton blend, wrinkle-resistant',
      price: 79.99,
      original_price: null,
      stars: 5,
      rating: 4.8,
      reviews: 0,
      type: 'women',
      category: 'professional',
      badge: 'Bestseller'
    },
    {
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Classic Pumps',
      description: 'Comfortable 3-inch heel',
      price: 119.99,
      original_price: 159.99,
      stars: 4,
      rating: 4.6,
      reviews: 0,
      type: 'women',
      category: 'professional',
      badge: 'Sale',
      is_on_sale: 1
    },
    {
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Executive Handbag',
      description: 'Leather, multiple compartments',
      price: 199.99,
      original_price: null,
      stars: 5,
      rating: 4.9,
      reviews: 0,
      type: 'women',
      category: 'professional',
      badge: null
    },
    
    // Women's Evening Wear
    {
      image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Elegant Black Gown',
      description: 'Floor-length, silk blend fabric',
      price: 459.99,
      original_price: null,
      stars: 5,
      rating: 4.9,
      reviews: 0,
      type: 'women',
      category: 'evening',
      badge: 'Premium'
    },
    {
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Red Cocktail Dress',
      description: 'Midi-length, perfect for parties',
      price: 289.99,
      original_price: null,
      stars: 4,
      rating: 4.7,
      reviews: 0,
      type: 'women',
      category: 'evening',
      badge: 'New'
    },
    {
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Navy Blue Elegance',
      description: 'Classic cut, timeless style',
      price: 329.99,
      original_price: null,
      stars: 5,
      rating: 4.8,
      reviews: 0,
      type: 'women',
      category: 'evening',
      badge: null
    },
    {
      image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Emerald Green Gown',
      description: 'Luxurious satin, dramatic silhouette',
      price: 399.99,
      original_price: null,
      stars: 5,
      rating: 4.9,
      reviews: 0,
      type: 'women',
      category: 'evening',
      badge: 'Trending',
      is_trending: 1
    },
    {
      image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Gold Sequin Glamour',
      description: 'Sparkling sequins, party perfect',
      price: 249.99,
      original_price: 299.99,
      stars: 4,
      rating: 4.6,
      reviews: 0,
      type: 'women',
      category: 'evening',
      badge: 'Sale',
      is_on_sale: 1
    },
    {
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      product_name: 'Wine Red Velvet',
      description: 'Rich velvet fabric, elegant design',
      price: 379.99,
      original_price: null,
      stars: 5,
      rating: 4.8,
      reviews: 0,
      type: 'women',
      category: 'evening',
      badge: null
    },
    
    // Kids - Boys
    {
      image: 'https://images.unsplash.com/photo-1577409873799-29f8be1311dd?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      product_name: 'Cool Graphic T-Shirt',
      description: 'Fun designs, comfortable fit',
      price: 19,
      original_price: 25,
      stars: 5,
      rating: 4.8,
      reviews: 89,
      type: 'kids',
      category: 'boys',
      badge: 'Sale',
      is_on_sale: 1
    },
    {
      image: 'https://images.unsplash.com/photo-1576881695454-731b64a39075?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      product_name: 'Casual Denim Jeans',
      description: 'Durable denim, active fit',
      price: 32,
      original_price: null,
      stars: 5,
      rating: 4.7,
      reviews: 156,
      type: 'kids',
      category: 'boys',
      badge: 'Trending',
      is_trending: 1
    },
    {
      image: 'https://images.unsplash.com/photo-1527254402522-c565413b0ec8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      product_name: 'Adventure Cargo Shorts',
      description: 'Multiple pockets, adventure ready',
      price: 24,
      original_price: 30,
      stars: 5,
      rating: 4.9,
      reviews: 203,
      type: 'kids',
      category: 'boys',
      badge: 'Sale',
      is_on_sale: 1
    },
    {
      image: 'https://images.unsplash.com/photo-1695527602872-fac5b451c897?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      product_name: 'Sporty Hoodie',
      description: 'Warm and cozy, sporty style',
      price: 38,
      original_price: null,
      stars: 5,
      rating: 4.6,
      reviews: 78,
      type: 'kids',
      category: 'boys',
      badge: 'Trending',
      is_trending: 1
    },
    {
      image: 'https://media.istockphoto.com/id/1189826374/photo/a-boy-wearing-a-blue-t-shirt-stands-in-front-of-the-camera-against-the-background-of-a-map-of.jpg?s=1024x1024&w=is&k=20&c=d51WioRFt0m740pWKE40UkzF8DatM2PKE4sBunE2i20=',
      product_name: 'Boys Polo Shirt',
      description: 'Classic polo, smart casual',
      price: 28,
      original_price: 35,
      stars: 5,
      rating: 4.8,
      reviews: 124,
      type: 'kids',
      category: 'boys',
      badge: 'Sale',
      is_on_sale: 1
    },
    {
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop&auto=format',
      product_name: 'Sporty Track Suit',
      description: 'Full set, athletic style',
      price: 45,
      original_price: null,
      stars: 4,
      rating: 4.5,
      reviews: 92,
      type: 'kids',
      category: 'boys',
      badge: null
    },
    
    // Kids - Girls
    {
      image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=500&fit=crop&auto=format',
      product_name: 'Floral Print Dress',
      description: 'Beautiful floral pattern',
      price: 25,
      original_price: 32,
      stars: 5,
      rating: 4.8,
      reviews: 124,
      type: 'kids',
      category: 'girls',
      badge: 'Sale',
      is_on_sale: 1
    },
    {
      image: 'https://www.fayonkids.com/cdn/shop/files/manufactured-by-fayon-kids-noida-u-p-lilac-ruffle-gown-for-girls-41152760250624.jpg?v=1717840935&width=533',
      product_name: 'Princess Party Dress',
      description: 'Perfect for special occasions',
      price: 38,
      original_price: null,
      stars: 5,
      rating: 4.9,
      reviews: 186,
      type: 'kids',
      category: 'girls',
      badge: 'Trending',
      is_trending: 1
    },
    {
      image: 'https://peppermint.in/cdn/shop/files/SS23-15880-NavyBlue-G-M-1F1.jpg?v=1705747627',
      product_name: 'Casual Denim Skirt',
      description: 'Versatile and comfortable',
      price: 22,
      original_price: 28,
      stars: 5,
      rating: 4.6,
      reviews: 98,
      type: 'kids',
      category: 'girls',
      badge: 'Sale',
      is_on_sale: 1
    },
    {
      image: 'https://5.imimg.com/data5/KW/SF/YG/SELLER-33859177/girls-denim-jumpsuit-500x500.jpg',
      product_name: 'Jumpsuit',
      description: 'Trendy one-piece design',
      price: 18,
      original_price: null,
      stars: 5,
      rating: 4.7,
      reviews: 156,
      type: 'kids',
      category: 'girls',
      badge: 'Trending',
      is_trending: 1
    },
    {
      image: 'https://i.pinimg.com/474x/c7/ed/73/c7ed7319f752bd37438b99968560de88.jpg',
      product_name: 'Elegant Formal Dress',
      description: 'Perfect for formal events',
      price: 45,
      original_price: 55,
      stars: 5,
      rating: 4.9,
      reviews: 203,
      type: 'kids',
      category: 'girls',
      badge: 'Sale',
      is_on_sale: 1
    },
    {
      image: 'https://i.pinimg.com/736x/d4/f9/25/d4f925d8274fd05f1fbda76b6ac29302.jpg',
      product_name: 'Summer Cotton Frock',
      description: 'Light and airy for summer',
      price: 20,
      original_price: null,
      stars: 4,
      rating: 4.5,
      reviews: 89,
      type: 'kids',
      category: 'girls',
      badge: null
    },
    
    // Kids - Babies
    {
      image: 'https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=400&h=400&fit=crop',
      product_name: 'Organic Cotton Onesie Set',
      description: 'Soft organic cotton, gentle on skin',
      price: 24.99,
      original_price: null,
      stars: 5,
      rating: 4.9,
      reviews: 0,
      type: 'kids',
      category: 'babies',
      badge: null
    },
    {
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop',
      product_name: 'Soft Baby Romper',
      description: 'Comfortable all-day wear',
      price: 19.99,
      original_price: null,
      stars: 5,
      rating: 4.8,
      reviews: 0,
      type: 'kids',
      category: 'babies',
      badge: null
    },
    {
      image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=400&h=400&fit=crop',
      product_name: 'Baby Sleep Gown',
      description: 'Cozy sleepwear for peaceful nights',
      price: 16.99,
      original_price: null,
      stars: 5,
      rating: 4.7,
      reviews: 0,
      type: 'kids',
      category: 'babies',
      badge: null
    },
    {
      image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=400&h=400&fit=crop',
      product_name: 'Cute Animal Print Bib Set',
      description: 'Fun designs, easy to clean',
      price: 12.99,
      original_price: null,
      stars: 5,
      rating: 4.6,
      reviews: 0,
      type: 'kids',
      category: 'babies',
      badge: null
    },
    {
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop',
      product_name: 'Hooded Baby Towel',
      description: 'Super absorbent, adorable hood',
      price: 22.99,
      original_price: null,
      stars: 5,
      rating: 4.9,
      reviews: 0,
      type: 'kids',
      category: 'babies',
      badge: null
    },
    {
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop',
      product_name: 'Baby Bootie Set',
      description: 'Warm and cozy for tiny feet',
      price: 14.99,
      original_price: null,
      stars: 5,
      rating: 4.8,
      reviews: 0,
      type: 'kids',
      category: 'babies',
      badge: null
    }
  ];

  const insertStatement = db.prepare(`
    INSERT INTO products (
      image, product_name, description, price, original_price, 
      stars, rating, reviews, type, category, 
      is_on_sale, is_trending, badge
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let successCount = 0;
  let errorCount = 0;

  products.forEach(product => {
    insertStatement.run(
      product.image,
      product.product_name,
      product.description,
      product.price,
      product.original_price,
      product.stars,
      product.rating,
      product.reviews,
      product.type,
      product.category,
      product.is_on_sale || 0,
      product.is_trending || 0,
      product.badge
    , (err) => {
      if (err) {
        console.error('Error inserting product:', product.product_name, err.message);
        errorCount++;
      } else {
        successCount++;
      }
    });
  });

  insertStatement.finalize(() => {
    console.log(`Database seeded successfully! ${successCount} products added.`);
    if (errorCount > 0) {
      console.log(`${errorCount} errors occurred.`);
    }
  });
}

// Get all products
function getAllProducts(callback) {
  db.all('SELECT * FROM products', [], callback);
}

// Get products by type (men, women, kids)
function getProductsByType(type, callback) {
  db.all('SELECT * FROM products WHERE type = ?', [type], callback);
}

// Get products by type and category
function getProductsByTypeAndCategory(type, category, callback) {
  db.all('SELECT * FROM products WHERE type = ? AND category = ?', [type, category], callback);
}

// Get single product by ID
function getProductById(id, callback) {
  db.get('SELECT * FROM products WHERE id = ?', [id], callback);
}

// Get featured products (trending or on sale)
function getFeaturedProducts(callback) {
  db.all('SELECT * FROM products WHERE is_trending = 1 OR is_on_sale = 1 LIMIT 12', [], callback);
}

// Export functions
export {
  db,
  getAllProducts,
  getProductsByType,
  getProductsByTypeAndCategory,
  getProductById,
  getFeaturedProducts
};
