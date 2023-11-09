import Form from 'react-bootstrap/Form';
import { useState } from 'react';

// Form Questions
import Experience from './formQuestions/Experience';
import ClassLevel from './formQuestions/ClassLevel';
import Exposure from './formQuestions/Exposure';
import Length from './formQuestions/Length';
import Location from './formQuestions/Location';
import Range from './formQuestions/Range';
import Traffic from './formQuestions/Traffic';

function UserForm ({ setShowForm }) {

    // Make the apiKey fetch inside of the location question

    const [step, setStep] = useState(1);
    const [userLocation, setUserLocation] = useState(null);

    // Need to make the values for user preferences more manageable. Check with what is in the database.

    const [responses, setResponses] = useState({
        experience: 1,
        class: 1,
        classPreference: [],
        exposure: 0,
        length: 0,
        gain: 0,
        location: userLocation,
        distance: 0,
        range: 0,
        traffic: 0
    });

    return (
    <Form id="user-form">
        {step === 1 ? (
        <Experience responses={responses} setResponses={setResponses} step={step} setStep={setStep} />
        ) : null}
        {step === 2 ? (
        <ClassLevel responses={responses} setResponses={setResponses} step={step} setStep={setStep} />
        ) : null}
        {step === 3 ? (
        <Exposure responses={responses} setResponses={setResponses} step={step} setStep={setStep} />
        ) : null}
        {step === 4 ? (
        <Length responses={responses} setResponses={setResponses} step={step} setStep={setStep} />
        ) : null}
        {step === 5 ? (
        <Location responses={responses} setResponses={setResponses} step={step} setStep={setStep} userLocation={userLocation} setUserLocation={setUserLocation}/>
        ) : null}
        {step === 6 ? (
        <Range responses={responses} setResponses={setResponses} step={step} setStep={setStep} />
        ) : null}
        {step === 7 ? (
        <Traffic responses={responses} setResponses={setResponses} step={step} setStep={setStep} setShowForm={setShowForm} />
        ) : null}
    </Form>
  );
}

export default UserForm;