import sqlite3 from 'sqlite3';
const sqlite = sqlite3.verbose();
const db = new sqlite.Database('./products.db');

db.all(
  'SELECT id, product_name, type, category, is_available FROM products WHERE type="men" AND category="sportswear"',
  (err, rows) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log(`Found ${rows.length} sportswear products:`);
      rows.forEach(r => {
        console.log(`- ${r.id}: ${r.product_name} (available: ${r.is_available})`);
      });
    }
    db.close();
  }
);
