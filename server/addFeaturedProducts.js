import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sqlite = sqlite3.verbose();
const db = new sqlite.Database(path.join(__dirname, 'products.db'));

const featuredProducts = [
  {
    product_name: 'Urban Classic T-Shirt',
    description: 'Premium quality cotton t-shirt with modern urban design. Perfect for everyday casual wear.',
    price: 29.99,
    original_price: null,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    type: 'featured',
    category: 'clothing',
    badge: 'New',
    stars: 5,
    rating: 4.8,
    reviews: 245,
    is_available: 1
  },
  {
    product_name: 'Stylish Denim Jacket',
    description: 'Classic denim jacket with modern fit. A timeless piece for your wardrobe.',
    price: 69.99,
    original_price: 89.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    type: 'featured',
    category: 'clothing',
    badge: 'Sale',
    stars: 4,
    rating: 4.5,
    reviews: 189,
    is_available: 1
  },
  {
    product_name: 'Comfortable Sneakers',
    description: 'Ultra-comfortable sneakers with modern design. Perfect for all-day wear.',
    price: 79.99,
    original_price: null,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    type: 'featured',
    category: 'footwear',
    badge: 'Hot',
    stars: 5,
    rating: 4.9,
    reviews: 312,
    is_available: 1
  },
  {
    product_name: 'Designer Backpack',
    description: 'Spacious designer backpack with multiple compartments. Perfect for work or travel.',
    price: 59.99,
    original_price: null,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    type: 'featured',
    category: 'accessories',
    badge: null,
    stars: 4,
    rating: 4.3,
    reviews: 156,
    is_available: 1
  }
];

// First, check if featured products already exist
db.all('SELECT COUNT(*) as count FROM products WHERE type="featured"', (err, rows) => {
  if (err) {
    console.error('Error checking featured products:', err);
    db.close();
    return;
  }

  if (rows[0].count > 0) {
    console.log(`Featured products already exist (${rows[0].count} products). Skipping insertion.`);
    db.close();
    return;
  }

  // Insert featured products
  const insertStmt = db.prepare(`
    INSERT INTO products (product_name, description, price, original_price, image, type, category, badge, stars, rating, reviews, is_available)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let insertedCount = 0;

  featuredProducts.forEach((product) => {
    insertStmt.run(
      product.product_name,
      product.description,
      product.price,
      product.original_price,
      product.image,
      product.type,
      product.category,
      product.badge,
      product.stars,
      product.rating,
      product.reviews,
      product.is_available,
      (err) => {
        if (err) {
          console.error(`Error inserting ${product.product_name}:`, err);
        } else {
          insertedCount++;
          console.log(`✓ Added: ${product.product_name}`);
        }

        if (insertedCount === featuredProducts.length) {
          insertStmt.finalize();
          console.log(`\n✅ Successfully added ${insertedCount} featured products to the database!`);
          db.close();
        }
      }
    );
  });
});
