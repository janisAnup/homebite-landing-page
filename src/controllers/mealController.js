const crypto = require('crypto');
const meals = require('../models/mealModel');

function validate(body, existingImage = '') {
  const hasImage = Object.prototype.hasOwnProperty.call(body, 'image');
  const image = hasImage ? String(body.image || '').trim() : existingImage;
  const isUploadedImage = /^data:image\/(png|jpeg|webp|gif);base64,[a-z0-9+/=]+$/i.test(image);
  const isRemoteImage = /^https?:\/\//i.test(image);
  const meal = { name: String(body.name || '').trim(), price: Number(body.price), cuisine: String(body.cuisine || '').trim(), diet: String(body.diet || '').trim(), availability: String(body.availability || '').trim(), image };
  if (meal.name.length < 2 || !Number.isFinite(meal.price) || meal.price <= 0 || meal.price > 100000 || !meal.cuisine || !['Veg', 'Non-Veg', 'Vegan'].includes(meal.diet) || !['Available', 'Sold out', 'Unavailable'].includes(meal.availability) || (image && !isUploadedImage && !isRemoteImage) || image.length > 3_500_000) return null;
  return meal;
}
exports.list = async (req, res) => {
  const results = await meals.all(req.query);
  res.json({ ok: true, meals: req.query.availability ? results : results.filter(meal => meal.availability !== 'Unavailable') });
};
exports.getOne = async (req, res) => {
  const meal = await meals.find(req.params.id);
  if (!meal || meal.availability === 'Unavailable') return res.status(404).json({ ok: false, message: 'Meal not found.' });
  res.json({ ok: true, meal });
};
exports.mine = async (req, res) => res.json({ ok: true, meals: await meals.byCook(req.user.id) });
exports.create = async (req, res) => { const values = validate(req.body); if (!values) return res.status(400).json({ ok: false, message: 'Provide valid meal details and an optional image up to 2.5 MB.' }); const meal = await meals.create({ id: crypto.randomUUID(), ...values, cookId: req.user.id, cookName: req.user.username, createdAt: new Date().toISOString() }); return res.status(201).json({ ok: true, meal }); };
exports.update = async (req, res) => { const current = await meals.find(req.params.id); if (!current) return res.status(404).json({ ok: false, message: 'Meal not found.' }); if (current.cookId !== req.user.id) return res.status(403).json({ ok: false, message: 'You can only edit your own meals.' }); const values = validate(req.body, current.image); if (!values) return res.status(400).json({ ok: false, message: 'Meal details or image are invalid.' }); return res.json({ ok: true, meal: await meals.update(current.id, values) }); };
exports.remove = async (req, res) => { const current = await meals.find(req.params.id); if (!current) return res.status(404).json({ ok: false, message: 'Meal not found.' }); if (current.cookId !== req.user.id) return res.status(403).json({ ok: false, message: 'You can only delete your own meals.' }); await meals.remove(current.id); return res.json({ ok: true }); };
