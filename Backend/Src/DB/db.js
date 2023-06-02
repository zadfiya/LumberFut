const sqlite3 = require('sqlite3').verbose();

// Create a new database object and open a connection
let db = new sqlite3.Database('./lumberfut.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

module.exports = db;