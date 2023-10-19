import NextButton from '../NextButton';
import PreviousButton from '../PreviousButton';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

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
            <option value="Elk">Elk Range</option>
            <option value="Front">Front Range</option>
            <option value="Mosquito">Mosquito Range</option>
            <option value="San Juan">San Juan Range</option>
            <option value="Sangre de Cristo">Sangre de Cristo Range</option>
            <option value="Sawatch">Sawatch Range</option>
            <option value="Ten Mile">Ten Mile Range</option>
        </Form.Select>
        <Form.Text id="class-description">
            Not familiar with the mountain ranges of Colorado? Read more about each range <Link to={"#"}>here.</Link>
        </Form.Text>
        <div className="btn-wrapper mt-4">
            <PreviousButton step={step} setStep={setStep} />
            <NextButton step={step} setStep={setStep} />
        </div>
        </>
    )
}

export default Range;