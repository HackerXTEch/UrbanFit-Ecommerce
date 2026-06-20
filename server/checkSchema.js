import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sqlite = sqlite3.verbose();
const db = new sqlite.Database(path.join(__dirname, 'products.db'));

db.all('PRAGMA table_info(products)', (err, columns) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Products table schema:');
    columns.forEach(col => {
      console.log(`  - ${col.name}: ${col.type} ${col.notnull ? 'NOT NULL' : ''} ${col.dflt_value ? `DEFAULT ${col.dflt_value}` : ''}`);
    });
  }
  db.close();
});
