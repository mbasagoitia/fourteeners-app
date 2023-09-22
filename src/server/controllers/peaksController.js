// Select peaks and routes of a certain range and difficulty

// SELECT DISTINCT peaks.name, routes.route_name, routes.difficulty FROM routes
// INNER JOIN peaks ON peaks.id = routes.peak_id
// INNER JOIN ranges WHERE peaks.range = "San Juan" AND routes.difficulty IN ("Class 1", "Class 2");