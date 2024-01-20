import NextButton from '../NextButton';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

function Experience ({ responses, setResponses, step, setStep, user }) {

    return (
    <>
    <Form.Label htmlFor="experience-select">Have you ever hiked a fourteener before (or a mountain of similar difficulty)?</Form.Label>
    <Form.Select value={responses.experience} onChange={(e)=> {
        setResponses((prevState) => ({
            ...prevState,
            experience: e.target.value,
        }))
    }} aria-label="experience-select" id="experience-select">
        <option value={1}>Nope! I'm looking to hike my first fourteener.</option>
        <option value={2}>I have a small amount of experience.</option>
        <option value={3}>I am moderately experienced.</option>
        <option value={4}>I have significant fourteener experience.</option>
    </Form.Select>
    {parseInt(responses.experience) !== 1 ? (
        <Form.Check
        className="mt-4"
        type="checkbox"
        label={user ? "Only show me peaks that I have not hiked before" : (
            <span>Only show me peaks that I have not hiked before (you must <Link to={"/login"}>log in</Link> for this feature)</span>
        )}
        id="new-peaks-checkbox"
        disabled={!user}
        onChange={(e)=> {
                setResponses((prevState) => ({
                    ...prevState,
                    newPeaksOnly: e.target.checked,
                }));
            }}
    />
    ) : null} 
    <div className="btn-wrapper d-block mt-4">
        <NextButton step={step} setStep={setStep} />
    </div>
    </>
    )
}

export default Experience;