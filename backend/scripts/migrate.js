const fs = require('fs');
const path = require('path');
const pool = require('../config/database');

const runMigration = async () => {
  try {
    const sqlPath = path.join(__dirname, '../..', 'scripts', 'init-db.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('Running database migration...');
    await pool.query(sql);
    console.log('Database migration completed successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

runMigration();
