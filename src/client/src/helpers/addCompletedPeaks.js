const addCompletedPeaks = async (newCompletedPeaks) => {
    try {
        const response = await fetch('http://localhost:5000/completedPeaks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        credentials: 'include',
        body: JSON.stringify(newCompletedPeaks),
        });

        if (response.ok) {
        console.log("Peaks added to list");
        } else {
            console.log("Error adding peaks to list")
        }
    } catch (error) {
        console.error('Error adding new peaks:', error);
    }
};

export default addCompletedPeaks;