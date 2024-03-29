async function fetchAdminFeedback() {
    try {
      const apiUrl = `http://localhost:5000/admin-feedback`;
      const response = await fetch(apiUrl, {
        credentials: "include"
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch feedback");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

async function fetchMsFeedback(peakId) {
    try {
      const apiUrl = `http://localhost:5000/admin-feedback/${peakId}`;
      const response = await fetch(apiUrl, {
        credentials: "include"
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch feedback");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
  
  export {
    fetchAdminFeedback,
    fetchMsFeedback
  };