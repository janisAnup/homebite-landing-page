const path = require('path');
const fs = require('fs/promises');
const sqlite3 = require('sqlite3').verbose();

const databasePath = path.join(__dirname, 'homebite.db');
const db = new sqlite3.Database(databasePath);

function run(sql, params = []) {
  return new Promise((resolve, reject) => db.run(sql, params, function done(error) {
    if (error) reject(error);
    else resolve({ lastID: this.lastID, changes: this.changes });
  }));
}
function get(sql, params = []) { return new Promise((resolve, reject) => db.get(sql, params, (error, row) => error ? reject(error) : resolve(row))); }
function all(sql, params = []) { return new Promise((resolve, reject) => db.all(sql, params, (error, rows) => error ? reject(error) : resolve(rows))); }

const ready = (async () => {
  await run(`CREATE TABLE IF NOT EXISTS meals (
    id TEXT PRIMARY KEY, name TEXT NOT NULL COLLATE NOCASE, price REAL NOT NULL,
    cuisine TEXT NOT NULL, diet TEXT NOT NULL, availability TEXT NOT NULL,
    image TEXT DEFAULT '', cookId TEXT NOT NULL, cookName TEXT NOT NULL,
    createdAt TEXT NOT NULL, updatedAt TEXT
  )`);
  const existing = await get('SELECT COUNT(*) AS count FROM meals');
  if (existing.count) return;
  try {
    const legacy = JSON.parse(await fs.readFile(path.join(__dirname, '..', 'data', 'meals.json'), 'utf8'));
    for (const meal of legacy) await run(
      'INSERT OR IGNORE INTO meals (id,name,price,cuisine,diet,availability,image,cookId,cookName,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
      [meal.id, meal.name, meal.price, meal.cuisine, meal.diet, meal.availability, meal.image || '', meal.cookId, meal.cookName, meal.createdAt || new Date().toISOString(), meal.updatedAt || null]
    );
  } catch (_) { /* A fresh database can start without seed records. */ }
})();

module.exports = { run, get, all, ready, databasePath };
