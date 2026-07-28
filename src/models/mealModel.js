const JsonStore = require('./jsonStore');
const store = new JsonStore('meals.json');
exports.all = () => store.read();
exports.byCook = async cookId => (await store.read()).filter(meal => meal.cookId === cookId);
exports.find = async id => (await store.read()).find(meal => meal.id === id);
exports.create = async meal => { const meals = await store.read(); meals.push(meal); await store.write(meals); return meal; };
exports.update = async (id, values) => { const meals = await store.read(); const index = meals.findIndex(meal => meal.id === id); if (index < 0) return null; meals[index] = { ...meals[index], ...values, id, updatedAt: new Date().toISOString() }; await store.write(meals); return meals[index]; };
exports.remove = async id => { const meals = await store.read(); const found = meals.find(meal => meal.id === id); if (!found) return null; await store.write(meals.filter(meal => meal.id !== id)); return found; };
