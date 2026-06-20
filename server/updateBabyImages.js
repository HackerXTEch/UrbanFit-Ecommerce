import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'products.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    process.exit(1);
  } else {
    console.log('Connected to products database.');
    updateBabyImages();
  }
});

function updateBabyImages() {
  const updates = [
    {
      name: 'Organic Cotton Onesie Set',
      image: 'https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=400&h=400&fit=crop'
    },
    {
      name: 'Baby Sleep Gown',
      image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=400&h=400&fit=crop'
    },
    {
      name: 'Cute Animal Print Bib Set',
      image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=400&h=400&fit=crop'
    },
    {
      name: 'Hooded Baby Towel',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop'
    },
    {
      name: 'Baby Bootie Set',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop'
    }
  ];

  const updateStatement = db.prepare('UPDATE products SET image = ? WHERE product_name = ?');

  let updatedCount = 0;
  updates.forEach(product => {
    updateStatement.run(product.image, product.name, function(err) {
      if (err) {
        console.error(`Error updating ${product.name}:`, err.message);
      } else if (this.changes > 0) {
        console.log(`✓ Updated ${product.name}`);
        updatedCount++;
      } else {
        console.log(`✗ Product not found: ${product.name}`);
      }
      
      if (updatedCount === updates.length) {
        console.log(`\nSuccessfully updated ${updatedCount} baby product images!`);
        db.close();
      }
    });
  });

  updateStatement.finalize();
}
