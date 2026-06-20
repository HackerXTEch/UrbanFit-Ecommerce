import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database path
const dbPath = path.join(__dirname, 'products.db');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to products database.');
    updateProductAvailability();
  }
});

function updateProductAvailability() {
  // Set some products as unavailable (products with IDs 3, 7, 11, 15, 19, 23, 27, 31)
  const unavailableProductIds = [3, 7, 11, 15, 19, 23, 27, 31, 35, 39];
  
  const placeholders = unavailableProductIds.map(() => '?').join(',');
  const query = `UPDATE products SET is_available = 0 WHERE id IN (${placeholders})`;
  
  db.run(query, unavailableProductIds, function(err) {
    if (err) {
      console.error('Error updating products:', err.message);
    } else {
      console.log(`Successfully marked ${this.changes} products as unavailable.`);
      
      // Display the unavailable products
      db.all(
        `SELECT id, product_name, type, category FROM products WHERE is_available = 0`,
        [],
        (err, rows) => {
          if (err) {
            console.error('Error fetching unavailable products:', err.message);
          } else {
            console.log('\nUnavailable products:');
            rows.forEach(row => {
              console.log(`  - ID ${row.id}: ${row.product_name} (${row.type} - ${row.category})`);
            });
          }
          db.close();
        }
      );
    }
  });
}
