import { fetchMsFeedback, fetchNumericFeedback, insertNumericFeedback, insertImprovements, insertMountainSpecificFeedback } from "../helpers/queries/feedbackQueries.js";

const getPeakFeedback = async (pool, req, res, next) => {
    try {
        const { peakId } = req.params;

        const msFeedback = await fetchMsFeedback(pool, peakId);
        const numericFeedback = await fetchNumericFeedback(pool, peakId);        

        res.status(200).json({ 
            msFeedback,
            numericFeedback
         });
      } catch (error) {
        next(error);
      }
}

const insertUserFeedback = async (pool, req, res, next) => {
    const isAuthenticated = req.isAuthenticated();
  
    if (isAuthenticated) {
        try {
            const { userFeedback } = req.body;
    
            await insertNumericFeedback(pool, userFeedback);
            await insertImprovements(pool, userFeedback);
            await insertMountainSpecificFeedback(pool, userFeedback);
    
            res.status(200).json({ message: 'User feedback inserted successfully.' });
          } catch (error) {
            next(error);
          }
    } else {
      res.status(401).json({ error: "Unauthorized request" })
    }
  };

export {
    getPeakFeedback,
    insertUserFeedback
}