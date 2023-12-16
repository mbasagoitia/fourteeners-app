const deleteCompletedPeak = async (peak) => {
    try {
        const response = await fetch(`http://localhost:5000/completedPeaks/${peak.id}`, {
        method: 'DELETE',
        credentials: 'include'
        });
        if (response.ok) {
        console.log("Peak successfully deleted");
        } else {
            console.error("Error deleting peak")
        }
    } catch (error) {
        console.error('Error deleting peak:', error);
    }
};

export default deleteCompletedPeak;