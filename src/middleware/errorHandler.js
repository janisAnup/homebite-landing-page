exports.notFound = (_req, res) => res.status(404).json({ ok: false, message: 'Route not found.' });
exports.errorHandler = (error, _req, res, _next) => { console.error(error); res.status(500).json({ ok: false, message: 'Something went wrong. Please try again.' }); };
