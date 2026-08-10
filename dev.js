const { spawn } = require('child_process');
const path = require('path');

const api = spawn(process.execPath, ['server.js'], { stdio: 'inherit' });
const client = spawn(process.execPath, [path.join(__dirname, 'node_modules', 'vite', 'bin', 'vite.js')], { stdio: 'inherit' });
let shuttingDown = false;

function stop(exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  api.kill();
  client.kill();
  process.exit(exitCode);
}

api.on('exit', code => {
  if (!shuttingDown) {
    console.error(`API server stopped unexpectedly (exit code ${code ?? 'unknown'}).`);
    stop(code || 1);
  }
});

client.on('exit', code => {
  if (!shuttingDown) {
    console.error(`Vite server stopped unexpectedly (exit code ${code ?? 'unknown'}).`);
    stop(code || 1);
  }
});

process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
