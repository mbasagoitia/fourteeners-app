// Ever hiked before
// If the user is not experienced, only show class 1 routes in question 2 and give them an option to choose higher classes if they feel comfortable

// Highest class
// Filter out ALL ROUTES that are above the user's class comfort
// Highest exposure
// Filter out ALL ROUTES that are above the user's exposure comfort

// Preferred range
// All remaining peaks with 1 or more remaining routes in this range get a starting score of ten before distance calculations

// Location/distance
// Calculate driving distance from each remaining peak from current location 
// Get upper limit (how far the user is willing to drive), split into five equal lengths
// Scores: 10 (closest), 8, 6, 4, 2


// Traffic
// Get user preference and score based on that. If they prefer no traffic, peaks with no traffic get 10 and vice versa.

// Length of hike
// Same logic as traffic, but check each route. Add the average/median score of all routes to the peak's overall score.

// Elevation gain
// Same logic as length