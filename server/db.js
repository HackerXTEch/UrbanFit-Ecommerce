import sqlite3 from 'sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, 'auth.db');

const sqlite = sqlite3.verbose();
const db = new sqlite.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error connecting to auth database:', err);
  } else {
    console.log('Connected to auth database.');
  }
});

db.serialize(() => {
  // First, create users table if it doesn't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Error creating users table:', err);
      return;
    }

    // Check which columns exist and add missing ones
    db.all(`PRAGMA table_info(users)`, (err, columns) => {
      if (err) {
        console.error('Error checking table schema:', err);
        return;
      }

      const columnNames = columns?.map(col => col.name) || [];
      
      // Add full_name column if it doesn't exist
      if (!columnNames.includes('full_name')) {
        console.log('Adding full_name column to users table...');
        db.run(`ALTER TABLE users ADD COLUMN full_name TEXT`, (err) => {
          if (err) console.error('Error adding full_name column:', err);
          else console.log('full_name column added successfully');
        });
      }

      // Add phone column if it doesn't exist
      if (!columnNames.includes('phone')) {
        console.log('Adding phone column to users table...');
        db.run(`ALTER TABLE users ADD COLUMN phone TEXT`, (err) => {
          if (err) console.error('Error adding phone column:', err);
          else console.log('phone column added successfully');
        });
      }

      // Add profile_pic column if it doesn't exist
      if (!columnNames.includes('profile_pic')) {
        console.log('Adding profile_pic column to users table...');
        db.run(`ALTER TABLE users ADD COLUMN profile_pic TEXT`, (err) => {
          if (err) console.error('Error adding profile_pic column:', err);
          else console.log('profile_pic column added successfully');
        });
      }
    });
  });
});

export function createUser(fullName, email, phone, profilePic, passwordHash) {
  return new Promise((resolve, reject) => {
    console.log('Creating user with:', { fullName, email, phone, profilePic: profilePic ? 'provided' : 'null' });
    const stmt = `INSERT INTO users (full_name, email, phone, profile_pic, password_hash, created_at) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(stmt, [fullName, email, phone, profilePic, passwordHash, new Date().toISOString()], function (err) {
      if (err) {
        console.error('Error inserting user:', err);
        return reject(err);
      }
      console.log('User created successfully with ID:', this.lastID);
      resolve({ id: this.lastID });
    });
  });
}

export function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

export function updateUserPassword(email, newPasswordHash) {
  return new Promise((resolve, reject) => {
    const stmt = `UPDATE users SET password_hash = ? WHERE email = ?`;
    db.run(stmt, [newPasswordHash, email], function (err) {
      if (err) return reject(err);
      if (this.changes === 0) {
        return reject(new Error('User not found'));
      }
      resolve({ success: true, changes: this.changes });
    });
  });
}

export default db;
