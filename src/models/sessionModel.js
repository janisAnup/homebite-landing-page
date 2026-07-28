const JsonStore = require('./jsonStore');
const store = new JsonStore('sessions.json');
exports.create = async session => { const sessions = await store.read(); sessions.push(session); await store.write(sessions); };
exports.find = async token => {
  const sessions = await store.read();
  const now = new Date();
  const active = sessions.filter(session => new Date(session.expiresAt) > now);
  if (active.length !== sessions.length) await store.write(active);
  return active.find(session => session.token === token);
};
exports.remove = async token => { const sessions = await store.read(); await store.write(sessions.filter(session => session.token !== token)); };
