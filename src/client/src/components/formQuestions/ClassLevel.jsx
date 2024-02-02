import NextButton from '../NextButton';
import PreviousButton from '../PreviousButton';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function ClassLevel ({responses, setResponses, step, setStep}) {
    const [experienceLevelAcknowledged, setExperienceLevelAcknowledged] = useState(false);

    const handleCheckboxChange = (value) => {
        const updatedClassPreferences = [...responses.classPreference];

        if (updatedClassPreferences.includes(value)) {
            const index = updatedClassPreferences.indexOf(value);
            updatedClassPreferences.splice(index, 1);
        } else {
            updatedClassPreferences.push(value);
        }
        setResponses({
            ...responses,
            classPreference: updatedClassPreferences
        })
    }

    const classPreferenceCheckboxes = [];
    const highestClass = parseInt(responses.class);
    if (highestClass) {
        for (let i = 1; i <= highestClass; i++) {
            classPreferenceCheckboxes.push(
                <Form.Check
                        type="checkbox"
                        key={i}
                        label={`Class ${i}`}
                        id={`classPreference-checkbox-${i}`}
                        value={i}
                        checked={responses.classPreference.includes(i)}
                        onChange={() => handleCheckboxChange(i)}
                />
            )
        }
    }

    return (
        <>
        <Form.Label htmlFor="class-select">What is the highest class you are comfortable with?</Form.Label>
        <Form.Select aria-label="class-select" id="class-select" value={responses.class} onChange={(e) => {
                    setExperienceLevelAcknowledged(false);
                    setResponses((prevState) => ({
                        ...prevState,
                        class: e.target.value
                    }))
                }}>
            <option value={1}>Class 1</option>
            <option value={2}>Class 2</option>
            <option value={3}>Class 3</option>
            <option value={4}>Class 4</option>
            <option value={5}>Class 5</option>
        </Form.Select>
        <Form.Text id="class-description">
            Not familiar with mountain classes? See our <Link to={"/mountain-classification-guide"}>informational guide.</Link>
        </Form.Text>
        {parseInt(responses.experience) === 1 && parseInt(responses.class) !== 1 ? (
            <div id="experience-warning">
                <p>You have indicated that you have never hiked a fourteener before. We recommend that you start with class 1 peaks for your first fourteener hike.</p>
                <Form.Check
                    type="checkbox"
                    label={`I verify that I am comfortable on class ${responses.class} terrain.`}
                    id="experience-warning-checkbox"
                    checked={experienceLevelAcknowledged}
                    onChange={(e) => setExperienceLevelAcknowledged(e.target.checked)}
                />
                </div>
        ) : null}
        {(parseInt(responses.class) > 1 && experienceLevelAcknowledged) || (parseInt(responses.class) > 1 && parseInt(responses.experience) > 1) ? (
            <>
            <Form.Label className='my-4'>Please select (if any) which class peaks you would prefer to hike/climb.</Form.Label>
            {classPreferenceCheckboxes}
            </>
        ) : null}
        {experienceLevelAcknowledged || parseInt(responses.experience) > 1 || parseInt(responses.class) === 1 ? (
            <div className="btn-wrapper mt-4">
                <PreviousButton step={step} setStep={setStep} />
                <NextButton step={step} setStep={setStep} />
            </div>
        ) : null}
        </>
    )
}

export default ClassLevel;