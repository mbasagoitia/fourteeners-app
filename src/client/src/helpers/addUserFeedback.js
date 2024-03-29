const addUserFeedback = async (userFeedback) => {
    try {
        const response = await fetch('http://localhost:5000/submit-feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        credentials: 'include',
        body: JSON.stringify({
            userFeedback: userFeedback
        })
        });

        if (response.ok) {
        console.log("Feedback successfully submitted");
        } else {
            console.log("Error submitting feedback");
        }
    } catch (error) {
        console.error('Error submitting feedback:', error);
    }
};

export default addUserFeedback;