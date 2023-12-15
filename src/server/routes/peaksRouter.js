const express = require("express");
const {
    recommendPeaks,
    getAllPeaks,
    getCompletedPeaks,
    getPeakDescription,
    addCompletedPeaks,
    updateCompletedPeaks,
    deleteCompletedPeaks
} = require("../controllers/peaksController");

const router = express.Router();

router.post("/recommend-peaks", recommendPeaks);
router.get('/allPeaks', getAllPeaks);
router.get('/peakDescription', getPeakDescription);
    
router.get('/completedPeaks', getCompletedPeaks);
router.post('/completedPeaks', addCompletedPeaks);
router.put('/completedPeaks/:id', updateCompletedPeaks);
router.delete('/completedPeaks/:id', deleteCompletedPeaks);

module.exports = router;