const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const VALID_PASSWORD = '123';

// Parse form submissions and JSON payloads sent from the login page.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Expose static project files such as HTML, CSS, and app.js.
app.use(express.static(__dirname));

app.get('/login', (_req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
  const role = String(req.body.role || '').trim().toLowerCase();
  const password = String(req.body.password || '').trim();
  const prefersJson = req.headers.accept && req.headers.accept.includes('application/json');

  function sendLoginResult(targetUrl, isError = false) {
    // The PDF-style architecture uses JSON for the Fetch request path:
    // login.html -> app.js -> server.js -> JSON -> app.js -> dashboard.
    if (prefersJson) {
      return res.status(isError ? 400 : 200).json({
        ok: !isError,
        redirectTo: targetUrl,
      });
    }

    // Keep standard browser form redirects working as a fallback.
    return res.redirect(targetUrl);
  }

  if (!role || !password) {
    return sendLoginResult('/login.html?status=error&message=Please+select+a+role+and+enter+the+password.', true);
  }

  if (password !== VALID_PASSWORD) {
    return sendLoginResult('/login.html?status=error&message=Incorrect+password.+Use+123+to+continue.', true);
  }

  if (role === 'customer') {
    return sendLoginResult('/customer_dashboard.html');
  }

  if (role === 'homecook') {
    return sendLoginResult('/homecook_dashboard.html');
  }

  return sendLoginResult('/login.html?status=error&message=Please+choose+a+valid+role.', true);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`HomeBite server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
