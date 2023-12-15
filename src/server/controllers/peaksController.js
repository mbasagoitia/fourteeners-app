const {
    fetchAllPeaks,
    fetchCompletedPeaks,
    fetchPeakDescription,
    addCompletedPeak,
    updateCompletedPeak,
    deleteCompletedPeak
} = require("../helpers/peakQueries");

const { scorePeaks } = require("../helpers/scorePeaks");

const recommendPeaks = (req, res) => {
    if (!req.body.responses) {
        return res.status(400).json({ error: "Missing user responses" });
    }
    const { responses } = req.body;

    scorePeaks(responses)
    .then((peaks) => {
        res.status(200).json({ peaks });
    })
    .catch((err) => {
        console.error(err);
    })
};

const getAllPeaks = async (req, res) => {
    try {
      const isAuthenticated = req.isAuthenticated();
  
      if (isAuthenticated) {
        const allPeaks = await fetchAllPeaks(pool);
        res.status(200).json({ allPeaks });
      } else {
        res.status(401).json("Unauthorized request");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const getCompletedPeaks = async (req, res) => {
    try {
      const isAuthenticated = req.isAuthenticated();
  
      if (isAuthenticated) {
        const completedPeaks = await fetchCompletedPeaks(pool, req.user.id);
        res.status(200).json({ completedPeaks });
      } else {
        res.status(401).json("Unauthorized request");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getPeakDescription = async (req, res) => {
    try {
      const isAuthenticated = req.isAuthenticated();
  
      if (isAuthenticated) {
        const { peakId } = req.query;
        const description = await fetchPeakDescription(pool, peakId);
        res.status(200).json({ description });
      } else {
        res.status(401).json({ error: "Unauthorized request" })
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const addCompletedPeaks = async (req, res) => {
    try {
        const isAuthenticated = req.isAuthenticated();
    
        if (isAuthenticated) {
            const userId = req.user.id;
            const { newCompletedPeaks } = req.body;

            if (newCompletedPeaks && newCompletedPeaks.length > 0) {
                for (let peak of newCompletedPeaks) {
                    const peakId = peak.id;
                    await addCompletedPeak(pool, userId, peakId);
                }
                return res.status(200).json("Peaks added successfully");
              }
        } else {
            return res.status(401).json({ error: "Unauthorized request" })
          }
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }
  };

const updateCompletedPeaks = async (req, res) => {
    try {
        const isAuthenticated = req.isAuthenticated();

        if (isAuthenticated) {
            const { peakId } = req.params;
            const { dateCompleted } = req.body;
            const userId = req.user.id;

            await updateCompletedPeak(pool, userId, peakId, dateCompleted);
        return res.status(200).json({ message: 'Peak updated successfully' });
    } 
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}

// make sure that only the id is passed, not the entire peak object
const deleteCompletedPeaks = async (req, res) => {
    try {
    const isAuthenticated = req.isAuthenticated();

    if (isAuthenticated) {
        const { peakId } = req.params;
        const userId = req.user.id;
            await deleteCompletedPeak(pool, userId, peakId);
            return res.status(200).json("Peak successfully deleted");
        } else {
            return res.status(401).json({ error: "Unauthorized request" });
        }
    } catch(error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }
}


module.exports = {
    recommendPeaks,
    getAllPeaks,
    getCompletedPeaks,
    getPeakDescription,
    addCompletedPeaks,
    updateCompletedPeaks,
    deleteCompletedPeaks
}
