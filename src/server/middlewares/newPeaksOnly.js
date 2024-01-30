import { fetchCompletedPeaks } from "../helpers/queries/peakQueries.js";

const newPeaksOnly = (pool) => async (req, res, next) => {
    try {
        if (req.body.responses.newPeaksOnly) {
            if (req.isAuthenticated()) {
                const completedPeaks = await fetchCompletedPeaks(pool, req.user.id);
                const completedPeakIds = completedPeaks.map((peak) => peak.id);
                req.completedPeakIds = completedPeakIds;
                next();
            } else {
                res.status(401).json("Unauthorized request");
            }
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}

export default newPeaksOnly;
