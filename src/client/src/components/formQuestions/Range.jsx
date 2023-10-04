import NextButton from '../NextButton';
import PreviousButton from '../PreviousButton';
import Form from 'react-bootstrap/Form';

function Range({responses, setResponses, step, setStep}) {
    return (
        <>
        <Form.Label htmlFor="range-select">Would you like to explore a particular mountain range on your next hike?</Form.Label>
        <Form.Select aria-label="range-select" id="range-select" value={responses.range} onChange={(e) => {
                    setResponses((prevState) => ({
                        ...prevState,
                        range: e.target.value
                    }))
                }}>
            <option value={0}>No preference</option>
            <option value="elk">Elk Range</option>
            <option value="front">Front Range</option>
            <option value="mosquito">Mosquito Range</option>
            <option value="san juan">San Juan Range</option>
            <option value="sangre de cristo">Sangre de Cristo Range</option>
            <option value="sawatch">Sawatch Range</option>
            <option value="ten mile">Ten Mile Range</option>
        </Form.Select>
        <Form.Text id="class-description">
            Not familiar with the mountain ranges of Colorado? Read more about each range here.
        </Form.Text>
        <div className="btn-wrapper d-block mt-4">
            <PreviousButton step={step} setStep={setStep} />
            <NextButton step={step} setStep={setStep} />
        </div>
        </>
    )
}

export default Range;