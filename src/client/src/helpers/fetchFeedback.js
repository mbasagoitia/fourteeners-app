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
  