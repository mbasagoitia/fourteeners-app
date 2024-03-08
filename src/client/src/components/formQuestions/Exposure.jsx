import NextButton from '../NextButton';
import PreviousButton from '../PreviousButton';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Exposure ({responses, setResponses, step, setStep}) {
    const [exposureLevelAcknowledged, setExposureLevelAcknowledged] = useState(false);

    return (
        <>
        <Form.Label htmlFor="exposure-select">What is the highest level of exposure you are comfortable with?</Form.Label>
        <Form.Select aria-label="exposure-select" id="exposure-select" value={responses.exposure} onChange={(e) => {
                    setExposureLevelAcknowledged(false);
                    setResponses((prevState) => ({
                        ...prevState,
                        exposure: e.target.value
                    }))
                }}>
            <option value={0}>Very low exposure</option>
            <option value={1}>Low exposure</option>
            <option value={2}>Medium exposure</option>
            <option value={3}>High exposure</option>
            <option value={4}>Very high exposure</option>
            <option value={5}>Extreme exposure</option>
        </Form.Select>
        <Form.Text id="exposure-description">
            See the <Link to={"/mountain-classification-guide"}>guide</Link> for information on exposure.
        </Form.Text>
        {parseInt(responses.experience) === 1 && (parseInt(responses.exposure) !== 0 && parseInt(responses.exposure) !== 1) ? (
            <div id="exposure-warning" className="mt-4">
                <p>You have indicated that you have never hiked a fourteener before. We recommend that you start with peaks that have low exposure for your first hike.</p>
                <Form.Check
                    type="checkbox"
                    label={`I verify that I am comfortable with higher levels of exposure.`}
                    id="exposure-warning-checkbox"
                    checked={exposureLevelAcknowledged}
                    onChange={(e) => setExposureLevelAcknowledged(e.target.checked)}
                />
                </div>
        ) : null}
                <div className="btn-wrapper mt-4">
                <PreviousButton step={step} setStep={setStep} />
        {exposureLevelAcknowledged || parseInt(responses.experience) > 1 || parseInt(responses.exposure) === 0 || parseInt(responses.exposure) === 1 ? (
                <NextButton step={step} setStep={setStep} />
        ) : null}
                </div>
        </>
    )
}

export default Exposure;