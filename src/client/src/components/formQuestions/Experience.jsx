import NextButton from '../NextButton';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

function Experience ({ onLoginRedirect, responses, setResponses, step, setStep, user }) {

    const handleLogin = () => {
        if (!user && onLoginRedirect) {
            onLoginRedirect();
            }
    }
    return (
    <div className="experience-question">
        <Form.Label htmlFor="experience-select">Have you ever hiked a fourteener (or a mountain of similar difficulty) before?</Form.Label>
        <Form.Select value={responses.experience} onChange={(e)=> {
            setResponses((prevState) => ({
                ...prevState,
                experience: e.target.value,
            }))
        }} aria-label="experience-select" id="experience-select">
            <option value={1}>No, I have never hiked a fourteener before.</option>
            <option value={2}>I have a small amount of experience.</option>
            <option value={3}>I am moderately experienced.</option>
            <option value={4}>I have significant fourteener experience.</option>
        </Form.Select>
        {parseInt(responses.experience) !== 1 ? (
            <Form.Check
            className="mt-4"
            type="checkbox"
            label={user ? "Only suggest peaks that I have not hiked before" : (
                <span>Only suggest peaks that I have not hiked before (you must <Link to={"/login"} onClick={handleLogin} className="login-link">log in</Link> for this feature)</span>
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
    </div>
    )
}

export default Experience;