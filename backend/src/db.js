import sqlite3 from 'sqlite3';
import { readFileSync } from 'fs';
import { fileURLToPath } from "url";
import { dirname, join } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const databaseName = join(__dirname, '../database.db');

const db = new sqlite3.Database(databaseName, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
});

// Create tables
try {
    db.exec(readFileSync(join(__dirname, "../tables.sql"), 'utf8'));
} catch (err) {
    console.log(err);
    process.exit(1);
}

export default db;