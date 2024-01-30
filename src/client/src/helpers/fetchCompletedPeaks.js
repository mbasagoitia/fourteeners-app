const fetchCompletedPeaks = async () => {
    try {
        const response = await fetch('http://localhost:5000/completedPeaks', {
        method: 'GET',
        credentials: 'include',
        });

        if (response.ok) {
        const data = await response.json();
        return data.completedPeaks;
        }
    } catch (error) {
        console.error('Error fetching peaks:', error);
    }
};

export default fetchCompletedPeaks;