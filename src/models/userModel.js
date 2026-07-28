const JsonStore = require('./jsonStore');
const store = new JsonStore('users.json');
exports.findByIdentity = async identity => (await store.read()).find(user => user.email === identity || user.username.toLowerCase() === identity);
exports.create = async user => { const users = await store.read(); users.push(user); await store.write(users); return user; };
exports.setPasswordHash = async (id, passwordHash) => {
  const users = await store.read();
  const index = users.findIndex(user => user.id === id);
  if (index < 0) return null;
  users[index] = { ...users[index], passwordHash };
  delete users[index].password;
  await store.write(users);
  return users[index];
};
