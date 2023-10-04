import Button from 'react-bootstrap/Button';

function NextButton ({step, setStep, setResponses, userLocation}) {
    const handleNext = () => {
        if (step < 8) {
            setStep(step + 1);
            if (step === 5) {
                setResponses((prevState) => ({
                    ...prevState,
                    location: userLocation
                }))
            }
        }
    }

    return (
        <Button onClick={handleNext}>Next</Button>
    )
}

export default NextButton;