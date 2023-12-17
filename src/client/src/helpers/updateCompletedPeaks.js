// This function will be called when a user updates the date completed.
const updateCompletedPeaks = async (peak) => {
    try {
        const response = await fetch(`http://localhost:5000/completedPeaks/${peak.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            },
        credentials: 'include',
        body: JSON.stringify({
            dateCompleted: peak.date_completed
        }),
        });

        if (response.ok) {
        console.log("Peak successfully updated");
        } else {
            console.log("Error updating peak")
        }
    } catch (error) {
        console.error('Error updating peak:', error);
    }
};

export default updateCompletedPeaks;