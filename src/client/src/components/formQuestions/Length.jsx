import NextButton from '../NextButton';
import PreviousButton from '../PreviousButton';
import Form from 'react-bootstrap/Form';

function Length ({responses, setResponses, step, setStep}) {
    return (
        <>
        <Form.Label htmlFor="length-select">How long would you like your hike to be?</Form.Label>
        <Form.Select aria-label="length-select" id="length-select" value={responses.length} onChange={(e) => {
                setResponses((prevState) => ({
                    ...prevState,
                    length: e.target.value
                }))
            }}>
            <option value={0}>No preference</option>
            <option value={1}>Short hike (1-5 miles)</option>
            <option value={2}>Moderate hike (6-10 miles)</option>
            <option value={3}>Long hike (11-15 miles)</option>
            <option value={4}>Very long hike (16-20 miles)</option>
            <option value={5}>Extreme hike (21-26 miles)</option>
        </Form.Select>
        <Form.Text id="length-description">
            Longer hikes may require a multi-day commitment and backpacking equipment.
    </Form.Text>
   <Form.Label htmlFor="elevationGain-select" className="mt-4">What is your preferred elevation gain?</Form.Label>
   <Form.Select aria-label="elevationGain-select" id="elevationGain-select" value={responses.gain} onChange={(e) => {
               setResponses((prevState) => ({
                   ...prevState,
                   gain: e.target.value
               }))
           }}>
       <option value={0}>No preference</option>
       <option value={1}>Very low elevation gain (1,400-2,000 ft)</option>
       <option value={2}>Low elevation gain (2,001-3,000 ft)</option>
       <option value={3}>Moderate elevation gain (3,001-4,000 ft)</option>
       <option value={4}>High elevation gain (4,001-5,000 ft)</option>
       <option value={5}>Very high elevation gain (5,001-6,000 ft)</option>
       <option value={6}>Extreme elevation gain (6,001-7,500 ft)</option>
   </Form.Select>
   <div className="btn-wrapper mt-4">
        <PreviousButton step={step} setStep={setStep} />
        <NextButton step={step} setStep={setStep} />
   </div>
    </>
    )
}

export default Length;