import {
  fetchAllPeaks,
  fetchCompletedPeaks,
  fetchPeakDescription,
  addCompletedPeak,
  updateCompletedPeak,
  deleteCompletedPeak
} from "../helpers/queries/peakQueries.js";

import { scorePeaks } from "../helpers/scoring/scorePeaks.js";

const recommendPeaks = async (req, res, next) => {
  try {
      const { responses } = req.body;
      // May or not be a property on the request object
      const completedPeakIds = req.completedPeakIds;
      // The second parameter here, completedPeakIds will only be passed into scorePeaks
      // if it exists on the request object as defined by the newPeaksOnly middleware function.
      // Otherwise, it will pass in undefined.
      const peaks = await scorePeaks(responses, completedPeakIds);

      res.status(200).json({ peaks });
  } catch (err) {
      next(err);
  }
};


const getAllPeaks = async (pool, req, res, next) => {
    try {
    const allPeaks = await fetchAllPeaks(pool);
    res.status(200).json({ allPeaks });
  } catch (err) {
    next(err);
  }
};

const getCompletedPeaks = async (pool, req, res, next) => {
  const isAuthenticated = req.isAuthenticated();

  if (isAuthenticated) {
    try {
    const completedPeaks = await fetchCompletedPeaks(pool, req.user.id);
    res.status(200).json({ completedPeaks });
  } catch (err) {
    next(err);
  }
  } else {
    res.status(401).json("Unauthorized request");
  }
};

const getPeakDescription = async (pool, req, res, next) => {
    try {
    const { peakId } = req.query;
    const description = await fetchPeakDescription(pool, peakId);
    res.status(200).json({ description });
  } catch (err) {
    next(err);
  } 
};

const addCompletedPeaks = async (pool, req, res, next) => {
  const isAuthenticated = req.isAuthenticated();

  if (isAuthenticated) {
    try {
      const userId = req.user.id;
      const { newCompletedPeaks } = req.body;

      if (newCompletedPeaks && newCompletedPeaks.length > 0) {
          for (let peak of newCompletedPeaks) {
              const peakId = peak.id;
              await addCompletedPeak(pool, userId, peakId);
          }
          return res.status(200).json("Peaks added successfully");
        }
  } catch (err) {
    next(err);
  }
} else {
  return res.status(401).json({ error: "Unauthorized request" })
  }
};

const updateCompletedPeaks = async (pool, req, res, next) => {
  const isAuthenticated = req.isAuthenticated();

  if (isAuthenticated) {
    try {
      const { peakId } = req.params;
      const { dateCompleted } = req.body;
      const userId = req.user.id;

      await updateCompletedPeak(pool, userId, peakId, dateCompleted);
      return res.status(200).json({ message: 'Peak updated successfully' });
    } catch (error) {
      next(err);
    }
  } else {
    return res.status(401).json({ error: "Unauthorized request" })
  }
}

const deleteCompletedPeaks = async (pool, req, res, next) => {
    const isAuthenticated = req.isAuthenticated();

    if (isAuthenticated) {
      try {
        const { peakId } = req.params;
        const userId = req.user.id;
            await deleteCompletedPeak(pool, userId, peakId);
            return res.status(200).json("Peak successfully deleted");
        } catch(err) {
          next(err);
        } 
    } else {
      return res.status(401).json({ error: "Unauthorized request" });
  }
}

export {
  recommendPeaks,
  getAllPeaks,
  getCompletedPeaks,
  getPeakDescription,
  addCompletedPeaks,
  updateCompletedPeaks,
  deleteCompletedPeaks
};

