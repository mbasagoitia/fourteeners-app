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
    const peakId = peak.id;
    if (peak.hasOwnProperty("id")) {
        const routes = peak.routes;
        for (let routeName in routes) {
            if (routes.hasOwnProperty(routeName)) {
                const route = routes[routeName];
                const className = route.difficulty;
                connection.query(
                    `SELECT id FROM Classes WHERE class_name = ?`, [className], (err, results) => {
                        if (err) throw err;
                        if (results.length > 0) {
                            const classId = results[0].id;
                            connection.query(
                                `INSERT INTO Peak_Classes (peak_id, class_id) VALUES (?, ?)`,
                                [peakId, classId], (err) => {
                                    if (err) throw err;
                                }
                            )
                        }
                    }
                )
            }
        }
    }
}

// for (let peak of data) {
//     const insertQuery = `INSERT INTO Peaks (id, name, img, description, elevation, \`rank\`, link, \`range\`, forest, latitude, longitude, grizzlyBears, marmots, traffic, numberOfRoutes, routes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//     const values = [
//         peak.id, peak.name, peak.img, peak.description, peak.elevation, peak.rank, peak.link, peak.range, peak.forest, peak.latitude, peak.longitude, peak.grizzlyBears, peak.marmots, peak.traffic, peak.numberOfRoutes, JSON.stringify(peak.routes)
//     ];

//     connection.query(insertQuery, values, (error, results) => {
//         if (error) throw error;
//     })
// }

// connection.end();

//     const peakId = peak.id;
//     for (let routeName in peak.routes) {
//         if (peak.routes.hasOwnProperty(routeName)) {
//             const route = peak.routes[routeName];
//             connection.query(`SELECT id FROM Classes WHERE class_name = ?`, [route.difficulty], (err, classResults) => {
//                 if (err) throw err;
//                 const classId = classResults[0].id;
//                 connection.query(`INSERT INTO Routes (peak_id, route_name, mileage, gain, difficulty, exposure) VALUES (?, ?, ?, ?, ?, ?)`, [peakId, routeName, route.mileage, route.gain, route.difficulty, route.exposure], (err) => {
//                     if (err) throw err;
//                 })
//                 connection.query(`INSERT INTO Peak_Classes (peak_id, class_id) VALUES (?, ?)`, [peakId, classId], (err) => {
//                     if (err) throw err;
//                 })
//             })
//         }
//     }

