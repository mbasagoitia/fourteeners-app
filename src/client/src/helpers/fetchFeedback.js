    // Feedback (to be displayed to all users, not the admins) will be an object with this structure:
    // {
    //     reviewCount,
    //     msFeedback: {
    //         {
    //             user: username,
    //             comment: comment
    //         },
    //         {
    //             user: username,
    //             comment: comment
    //         }
    //     },
    //         ratings: {
    //         effectivenessScore: 2,
    //         usabilityScore: 3,
    //         relevanceScore: 5,
    //         futureUseScore: 5,
    //         experienceScore: 4,
    //         overallScore: 4
    //     }
    // }

async function fetchFeedback(peakId) {
    try {
      const apiUrl = `http://localhost:5000/feedback/${peakId}`;
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error("Failed to fetch feedback");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
  
  export default fetchFeedback;
  