import Button from 'react-bootstrap/esm/Button';
import PreviousButton from '../PreviousButton';
import Form from 'react-bootstrap/Form';
import fetchRecommendedPeaks from '../../fetchRecommendedPeaks';

function Traffic({responses, setResponses, step, setStep}) {

    return (
        <>
        <Form.Label htmlFor="traffic-select">What is your preference for traffic (other hikers) on your hike?</Form.Label>
        <Form.Select aria-label="traffic-select" id="traffic-select" value={responses.traffic} onChange={(e) => {
                    setResponses((prevState) => ({
                        ...prevState,
                        traffic: e.target.value
                    }))
                }}>
            <option value={0}>No preference</option>
            <option value="low">Low traffic</option>
            <option value="medium">Medium traffic</option>
            <option value="high">High traffic</option>
            <option value="extreme">Extreme traffic</option>
            <option value="critical">Critical traffic</option>
        </Form.Select>
        <Form.Text id="traffic-description">
            Note that traffic can vary on each peak depending on season, day of the week, and route. The standard route on each peak typically has the most traffic.
        </Form.Text>
        <div className="btn-wrapper d-block mt-4">
            <PreviousButton step={step} setStep={setStep} />
            <Button onClick={() => {
                fetchRecommendedPeaks(responses);
            }}>Submit</Button>
        </div>
        </>
    )
}

export default Traffic;