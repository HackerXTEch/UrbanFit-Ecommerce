import sqlite3 from 'sqlite3';
const sqlite = sqlite3.verbose();
const db = new sqlite.Database('./products.db');

db.all(
  'SELECT id, product_name, type, category FROM products',
  (err, rows) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log(`Found ${rows.length} total products:`);
      const byCategory = {};
      rows.forEach(r => {
        const key = `${r.type} - ${r.category}`;
        if (!byCategory[key]) byCategory[key] = [];
        byCategory[key].push(r.product_name);
      });
      Object.keys(byCategory).forEach(cat => {
        console.log(`\n${cat}: ${byCategory[cat].length} products`);
        byCategory[cat].forEach(name => console.log(`  - ${name}`));
      });
    }
    db.close();
  }
);
