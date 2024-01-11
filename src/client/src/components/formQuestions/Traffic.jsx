import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import PreviousButton from '../PreviousButton';
import Form from 'react-bootstrap/Form';
import fetchRecommendedPeaks from "../../helpers/fetchRecommendedPeaks";

function Traffic({ responses, setResponses, step, setStep }) {

    const navigate = useNavigate();

    const handleSubmit = () => {
        fetchRecommendedPeaks(responses)
        .then((data) => {
            navigate("/recommendations", { state: { data, responses } });
        })
    }

    return (
        <>
        <Form.Label htmlFor="traffic-select">What is your preferred level of traffic (other hikers) on your hike?</Form.Label>
        <Form.Select aria-label="traffic-select" id="traffic-select" value={responses.traffic} onChange={(e) => {
                    setResponses((prevState) => ({
                        ...prevState,
                        traffic: e.target.value
                    }))
                }}>
            <option value={0}>No preference</option>
            <option value={1}>Low traffic</option>
            <option value={2}>Medium traffic</option>
            <option value={3}>High traffic</option>
            <option value={4}>Extreme traffic</option>
            <option value={5}>Critical traffic</option>
        </Form.Select>
        <Form.Text id="traffic-description">
            Note that traffic can vary on each peak depending on season, day of the week, and route. The standard route on each peak typically has the most traffic.
        </Form.Text>
        <div className="btn-wrapper mt-4">
            <PreviousButton step={step} setStep={setStep} />
            <Button onClick={handleSubmit}>Submit</Button>
        </div>
        </>
    )
}

export default Traffic;