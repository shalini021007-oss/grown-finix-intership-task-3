const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(express.json());

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE properties (id INT, title TEXT, price INT, location TEXT)");
    db.run("INSERT INTO properties VALUES (1, 'Luxury Villa', 500000, 'Delhi')");
    db.run("INSERT INTO properties VALUES (2, 'Cozy Apartment', 200000, 'Mumbai')");
});

// VULNERABLE ENDPOINT (SQL Injection Risk)
app.get('/api/v1/properties/vulnerable', (req, res) => {
    const location = req.query.location;
    const query = `SELECT * FROM properties WHERE location = '${location}'`;
    
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// PATCHED ENDPOINT (Prepared Statements)
app.get('/api/v1/properties/search', (req, res) => {
    const location = req.query.location;
    const query = `SELECT id, title, price, location FROM properties WHERE location = ?`;

    db.all(query, [location], (err, rows) => {
        if (err) return res.status(500).json({ error: "Internal server error" });
        res.json({ success: true, data: rows });
    });
});

app.listen(3000, () => console.log('SQLi Secure server running on port 3000'));
