const mysql = require("mysql2");
const fs = require("fs");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "fourteeners"
})

const jsonData = fs.readFileSync("peaks.json", "utf-8");

const data = JSON.parse(jsonData);

connection.connect();

for (let peak of data) {
    const insertQuery = `INSERT INTO Peaks (id, name, img, description, elevation, \`rank\`, link, \`range\`, forest, latitude, longitude, grizzlyBears, marmots, traffic, numberOfRoutes, routes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        peak.id, peak.name, peak.img, peak.description, peak.elevation, peak.rank, peak.link, peak.range, peak.forest, peak.latitude, peak.longitude, peak.grizzlyBears, peak.marmots, peak.traffic, peak.numberOfRoutes, JSON.stringify(peak.routes)
    ];

    connection.query(insertQuery, values, (error, results) => {
        if (error) throw error;
        console.log(`inserted row with ID ${results.insertId}`);
    })
}

connection.end();