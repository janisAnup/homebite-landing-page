const crypto = require('crypto');
const { promisify } = require('util');
const scrypt = promisify(crypto.scrypt);
const userModel = require('../models/userModel');
const sessionModel = require('../models/sessionModel');
const safeUser = user => ({ id: user.id, username: user.username, email: user.email, role: user.role });
const hash = async password => { const salt = crypto.randomBytes(16).toString('hex'); return `${salt}:${(await scrypt(password, salt, 64)).toString('hex')}`; };
const verify = async (password, stored) => {
  if (typeof stored !== 'string' || !stored.includes(':')) return false;
  const [salt, expected] = stored.split(':');
  const actual = await scrypt(password, salt, 64);
  const expectedBuffer = Buffer.from(expected, 'hex');
  return expectedBuffer.length === actual.length && crypto.timingSafeEqual(actual, expectedBuffer);
};
const sessionCookie = (res, token) => res.cookie('homebite_session', token, { httpOnly: true, sameSite: 'lax', maxAge: 1000 * 60 * 60 * 12, secure: process.env.NODE_ENV === 'production' });
const sessionFor = async (res, user) => { const token = crypto.randomBytes(32).toString('hex'); await sessionModel.create({ token, email: user.email, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString() }); sessionCookie(res, token); };
exports.register = async (req, res) => { const { username = '', email = '', password = '', role = '' } = req.body; const cleaned = { username: username.trim(), email: email.trim().toLowerCase(), role: role.toLowerCase() }; if (!/^[a-zA-Z0-9_ -]{2,30}$/.test(cleaned.username) || !/^\S+@\S+\.\S+$/.test(cleaned.email) || String(password).length < 8 || !['customer', 'homecook'].includes(cleaned.role)) return res.status(400).json({ ok: false, message: 'Use a valid username, email, 8-character password, and role.' }); if (await userModel.findByIdentity(cleaned.email) || await userModel.findByIdentity(cleaned.username.toLowerCase())) return res.status(409).json({ ok: false, message: 'That email or username is already registered.' }); const user = await userModel.create({ id: crypto.randomUUID(), ...cleaned, passwordHash: await hash(password), createdAt: new Date().toISOString() }); res.status(201).json({ ok: true, user: safeUser(user), redirectTo: '/login.html?status=success&message=Account+created.+Please+sign+in+to+continue.' }); };
exports.login = async (req, res) => {
  const identity = String(req.body.identity || '').trim().toLowerCase();
  const password = String(req.body.password || '');
  let user = await userModel.findByIdentity(identity);
  if (!user) return res.status(401).json({ ok: false, message: 'Incorrect email/username or password.' });

  const legacyPassword = Buffer.from(typeof user.password === 'string' ? user.password : '');
  const suppliedPassword = Buffer.from(password);
  const matches = user.passwordHash
    ? await verify(password, user.passwordHash)
    : legacyPassword.length === suppliedPassword.length && crypto.timingSafeEqual(suppliedPassword, legacyPassword);
  if (!matches) return res.status(401).json({ ok: false, message: 'Incorrect email/username or password.' });

  // Upgrade accounts created by the earlier JSON prototype on their first successful login.
  if (!user.passwordHash) user = await userModel.setPasswordHash(user.id, await hash(password));
  await sessionFor(res, user);
  res.json({ ok: true, user: safeUser(user), redirectTo: user.role === 'homecook' ? '/homecook_dashboard.html' : '/customer_dashboard.html' });
};
exports.logout = async (req, res) => { if (req.sessionToken) await sessionModel.remove(req.sessionToken); res.clearCookie('homebite_session'); res.json({ ok: true }); };
exports.me = (req, res) => res.json({ ok: true, user: safeUser(req.user) });
