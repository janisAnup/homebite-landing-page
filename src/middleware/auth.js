const sessionModel = require('../models/sessionModel');
const userModel = require('../models/userModel');

function readCookie(req, name) {
  const value = (req.headers.cookie || '').split(';').map(item => item.trim()).find(item => item.startsWith(`${name}=`));
  return value ? decodeURIComponent(value.slice(name.length + 1)) : null;
}

async function loadSessionUser(req) {
  const token = readCookie(req, 'homebite_session') || req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) return null;
  const session = await sessionModel.find(token);
  if (!session) return null;
  const user = await userModel.findByIdentity(session.email);
  return user ? { user, token } : null;
}

exports.requireAuth = async (req, res, next) => {
  try {
    const authenticated = await loadSessionUser(req);
    if (!authenticated) return res.status(401).json({ ok: false, message: 'Please sign in to continue.' });
    req.user = authenticated.user;
    req.sessionToken = authenticated.token;
    return next();
  } catch (error) { return next(error); }
};

exports.requireRole = role => (req, res, next) => req.user.role === role
  ? next()
  : res.status(403).json({ ok: false, message: 'You do not have permission for this action.' });

exports.requirePageAuth = role => async (req, res, next) => {
  try {
    const authenticated = await loadSessionUser(req);
    if (!authenticated || authenticated.user.role !== role) return res.redirect('/login.html');
    req.user = authenticated.user;
    req.sessionToken = authenticated.token;
    return next();
  } catch (error) { return next(error); }
};
