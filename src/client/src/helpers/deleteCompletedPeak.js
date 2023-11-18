const deleteCompletedPeak = async (peak) => {
    try {
        const response = await fetch('http://localhost:5000/completedPeaks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        credentials: 'include',
        body: JSON.stringify({
            peakToDelete: peak
        })
        });

        if (response.ok) {
        console.log("Peak successfully deleted");
        } else {
            console.log("Error deleting peak")
        }
    } catch (error) {
        console.error('Error deleting peak:', error);
    }
};

export default deleteCompletedPeak;