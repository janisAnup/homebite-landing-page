const fs = require('fs/promises');
const path = require('path');

class JsonStore {
  constructor(filename) { this.filename = path.join(__dirname, '../../data', filename); }
  async read() {
    try { return JSON.parse(await fs.readFile(this.filename, 'utf8')); }
    catch (error) { if (error.code === 'ENOENT') { await this.write([]); return []; } throw error; }
  }
  async write(records) {
    await fs.mkdir(path.dirname(this.filename), { recursive: true });
    const temporary = `${this.filename}.tmp`;
    await fs.writeFile(temporary, JSON.stringify(records, null, 2));
    await fs.rename(temporary, this.filename);
    return records;
  }
}
module.exports = JsonStore;
