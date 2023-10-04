import NextButton from '../NextButton';
import Form from 'react-bootstrap/Form';

function Experience ({responses, setResponses, step, setStep}) {
    return (
    <>
    <Form.Label htmlFor="experience-select">Have you ever hiked a fourteener before?</Form.Label>
    <Form.Select value={responses.experience} onChange={(e)=> {
        setResponses((prevState) => ({
            ...prevState,
            experience: e.target.value
        }))
    }} aria-label="experience-select" id="experience-select">
        <option value={1}>Nope! I'm looking to hike my first fourteener.</option>
        <option value={2}>I have hiked a few or have experience on mountains of similar difficulty.</option>
        <option value={3}>I am moderately experienced on fourteeners.</option>
        <option value={4}>I have significant fourteener experience.</option>
    </Form.Select>
    <Form.Text id="class-description">
        Did you know that you can keep track of your fourteener progress? Visit this page to view or edit your list!
    </Form.Text>
    {responses.experience !== "1" ? (
        <Form.Check
        type="checkbox"
        label="Only show me peaks that I have not hiked before (you must log in for this feature)"
        id="experience-checkbox"
    />
    ) : null} 
    <div className="btn-wrapper d-block mt-4">
        <NextButton step={step} setStep={setStep} />
    </div>
    </>
    )
}

export default Experience;