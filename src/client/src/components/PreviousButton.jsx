import Button from 'react-bootstrap/Button';

function PreviousButton ({step, setStep}) {
    const handlePrevious = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    }

    return (
        <Button onClick={handlePrevious}>Back</Button>
    )
}

export default PreviousButton;