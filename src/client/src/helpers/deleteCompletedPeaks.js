const deleteCompletedPeaks = async (peaksToDelete) => {
    try {
        const response = await fetch('http://localhost:5000/completedPeaks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        credentials: 'include',
        body: JSON.stringify(peaksToDelete),
        });

        if (response.ok) {
        console.log("Peaks successfully deleted");
        } else {
            console.log("Error deleting peaks")
        }
    } catch (error) {
        console.error('Error deleting peaks:', error);
    }
};

export default deleteCompletedPeaks;