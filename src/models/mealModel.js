const db = require('../../database/db');
const columns = 'id, name, price, cuisine, diet, availability, image, cookId, cookName, createdAt, updatedAt';

exports.all = async filters => {
  await db.ready;
  const clauses = []; const params = [];
  const addLike = (column, value) => { if (value) { clauses.push(`LOWER(${column}) LIKE LOWER(?)`); params.push(`%${value}%`); } };
  addLike('name', filters.q || filters.search); addLike('cuisine', filters.cuisine || filters.category);
  if (filters.diet) { clauses.push('diet = ?'); params.push(filters.diet); }
  if (filters.availability) { clauses.push('availability = ?'); params.push(filters.availability); }
  if (filters.cookId) { clauses.push('cookId = ?'); params.push(filters.cookId); }
  if (filters.maxPrice && Number.isFinite(Number(filters.maxPrice))) { clauses.push('price <= ?'); params.push(Number(filters.maxPrice)); }
  return db.all(`SELECT ${columns} FROM meals${clauses.length ? ` WHERE ${clauses.join(' AND ')}` : ''} ORDER BY createdAt DESC`, params);
};
exports.byCook = async cookId => { await db.ready; return db.all(`SELECT ${columns} FROM meals WHERE cookId = ? ORDER BY createdAt DESC`, [cookId]); };
exports.find = async id => { await db.ready; return db.get(`SELECT ${columns} FROM meals WHERE id = ?`, [id]); };
exports.create = async meal => { await db.ready; await db.run('INSERT INTO meals (id,name,price,cuisine,diet,availability,image,cookId,cookName,createdAt) VALUES (?,?,?,?,?,?,?,?,?,?)', [meal.id, meal.name, meal.price, meal.cuisine, meal.diet, meal.availability, meal.image, meal.cookId, meal.cookName, meal.createdAt]); return meal; };
exports.update = async (id, values) => { await db.ready; const updatedAt = new Date().toISOString(); await db.run('UPDATE meals SET name=?, price=?, cuisine=?, diet=?, availability=?, image=?, updatedAt=? WHERE id=?', [values.name, values.price, values.cuisine, values.diet, values.availability, values.image, updatedAt, id]); return exports.find(id); };
exports.remove = async id => { const meal = await exports.find(id); if (!meal) return null; await db.run('DELETE FROM meals WHERE id = ?', [id]); return meal; };
