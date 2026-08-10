const path = require('path');
const fs = require('fs/promises');

const workspace = path.join(__dirname, '..', '..', 'data', 'fs-lab');
const validName = name => typeof name === 'string' && /^[a-zA-Z0-9_-]+\.txt$/.test(name);
const target = name => path.join(workspace, name);
async function ensureWorkspace() { await fs.mkdir(workspace, { recursive: true }); }
function rejectInvalid(res, name) { if (!validName(name)) { res.status(400).json({ ok: false, message: 'Use a safe .txt filename (letters, numbers, _ or - only).' }); return true; } return false; }

exports.list = async (_req, res) => { await ensureWorkspace(); const files = (await fs.readdir(workspace)).filter(validName); res.json({ ok: true, files }); };
exports.create = async (req, res) => { const { name, content = '' } = req.body; if (rejectInvalid(res, name)) return; await ensureWorkspace(); try { await fs.writeFile(target(name), String(content), { flag: 'wx' }); res.status(201).json({ ok: true, message: 'File created.', name }); } catch (error) { res.status(error.code === 'EEXIST' ? 409 : 500).json({ ok: false, message: error.code === 'EEXIST' ? 'A file with that name already exists.' : 'Could not create the file.' }); } };
exports.read = async (req, res) => { if (rejectInvalid(res, req.params.name)) return; try { res.json({ ok: true, name: req.params.name, content: await fs.readFile(target(req.params.name), 'utf8') }); } catch (error) { res.status(error.code === 'ENOENT' ? 404 : 500).json({ ok: false, message: 'File not found.' }); } };
exports.update = async (req, res) => { if (rejectInvalid(res, req.params.name)) return; if (typeof req.body.content !== 'string') return res.status(400).json({ ok: false, message: 'Content must be text.' }); try { await fs.writeFile(target(req.params.name), req.body.content); res.json({ ok: true, message: 'File updated.' }); } catch (error) { res.status(error.code === 'ENOENT' ? 404 : 500).json({ ok: false, message: 'File not found.' }); } };
exports.append = async (req, res) => { if (rejectInvalid(res, req.params.name)) return; if (typeof req.body.content !== 'string') return res.status(400).json({ ok: false, message: 'Content must be text.' }); try { await fs.appendFile(target(req.params.name), req.body.content); res.json({ ok: true, message: 'Content appended.' }); } catch (error) { res.status(error.code === 'ENOENT' ? 404 : 500).json({ ok: false, message: 'File not found.' }); } };
exports.rename = async (req, res) => { const { newName } = req.body; if (rejectInvalid(res, req.params.name) || rejectInvalid(res, newName)) return; try { await fs.rename(target(req.params.name), target(newName)); res.json({ ok: true, message: 'File renamed.', name: newName }); } catch (error) { res.status(error.code === 'ENOENT' ? 404 : error.code === 'EEXIST' ? 409 : 500).json({ ok: false, message: 'Could not rename the file.' }); } };
exports.remove = async (req, res) => { if (rejectInvalid(res, req.params.name)) return; try { await fs.unlink(target(req.params.name)); res.json({ ok: true, message: 'File deleted.' }); } catch (error) { res.status(error.code === 'ENOENT' ? 404 : 500).json({ ok: false, message: 'File not found.' }); } };
