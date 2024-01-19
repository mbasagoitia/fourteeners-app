const fetchAllPeaks = async () => {
    try {
      const response = await fetch('http://localhost:5000/allPeaks', {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        return data.allPeaks;
      }
    } catch (error) {
      console.error('Error fetching peaks data:', error);
      return [];
    }
  };

export default fetchAllPeaks;