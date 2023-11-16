// This function will be called when a user updates the date completed.
const updateCompletedPeaks = async (peaksToUpdate) => {
    try {
        const response = await fetch('http://localhost:5000/completedPeaks', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            },
        credentials: 'include',
        body: JSON.stringify(peaksToUpdate),
        });

        if (response.ok) {
        console.log("Peaks successfully updated");
        } else {
            console.log("Error updating peaks")
        }
    } catch (error) {
        console.error('Error updating peaks:', error);
    }
};

export default updateCompletedPeaks;