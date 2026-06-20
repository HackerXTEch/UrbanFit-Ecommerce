import sqlite3 from 'sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, 'orders.db');

const sqlite = sqlite3.verbose();
const db = new sqlite.Database(DB_PATH);

db.serialize(() => {
  // Create orders table
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id TEXT UNIQUE NOT NULL,
      user_id INTEGER,
      email TEXT NOT NULL,
      shipping_info TEXT NOT NULL,
      payment_method TEXT NOT NULL,
      items TEXT NOT NULL,
      subtotal REAL NOT NULL,
      shipping REAL NOT NULL,
      tax REAL NOT NULL,
      total REAL NOT NULL,
      status TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);
});

export function createOrder(orderData) {
  return new Promise((resolve, reject) => {
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const stmt = `
      INSERT INTO orders (
        order_id, user_id, email, shipping_info, payment_method, 
        items, subtotal, shipping, tax, total, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    db.run(
      stmt,
      [
        orderId,
        orderData.userId,
        orderData.email,
        JSON.stringify(orderData.shippingInfo),
        orderData.paymentMethod,
        JSON.stringify(orderData.items),
        orderData.subtotal,
        orderData.shipping,
        orderData.tax,
        orderData.total,
        orderData.status,
        new Date().toISOString()
      ],
      function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID, orderId });
      }
    );
  });
}

export function getOrdersByUserId(userId) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
      [userId],
      (err, rows) => {
        if (err) return reject(err);
        const orders = rows.map(row => ({
          ...row,
          shipping_info: JSON.parse(row.shipping_info),
          items: JSON.parse(row.items)
        }));
        resolve(orders);
      }
    );
  });
}

export function getOrdersByEmail(email) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM orders WHERE email = ? ORDER BY created_at DESC`,
      [email],
      (err, rows) => {
        if (err) return reject(err);
        const orders = rows.map(row => ({
          ...row,
          shipping_info: JSON.parse(row.shipping_info),
          items: JSON.parse(row.items)
        }));
        resolve(orders);
      }
    );
  });
}

export function getOrderById(orderId) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM orders WHERE order_id = ?`,
      [orderId],
      (err, row) => {
        if (err) return reject(err);
        if (!row) return resolve(null);
        resolve({
          ...row,
          shipping_info: JSON.parse(row.shipping_info),
          items: JSON.parse(row.items)
        });
      }
    );
  });
}

export function updateOrderStatus(orderId, status) {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE orders SET status = ? WHERE order_id = ?`,
      [status, orderId],
      function (err) {
        if (err) return reject(err);
        if (this.changes === 0) {
          return reject(new Error('Order not found'));
        }
        resolve({ success: true, changes: this.changes });
      }
    );
  });
}

export default db;
