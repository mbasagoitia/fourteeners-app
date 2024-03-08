import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Container, Form } from 'react-bootstrap';

// Form Questions
import Experience from './formQuestions/Experience';
import ClassLevel from './formQuestions/ClassLevel';
import Exposure from './formQuestions/Exposure';
import Length from './formQuestions/Length';
import Location from './formQuestions/Location';
import Range from './formQuestions/Range';
import Traffic from './formQuestions/Traffic';

function UserForm ({ user, onLoginRedirect, step, setStep }) {

    const [userLocation, setUserLocation] = useState(null);

    const [responses, setResponses] = useState({
        experience: 1,
        newPeaksOnly: false,
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

    const location = useLocation();

    useEffect(() => {
      if (location.state && location.state.responses) {
        setResponses(location.state.responses);
      }
    }, [location.state, setResponses]);
  
    return (
      <Container className="form-question-container">
        <Form id="user-form">
          {step === 1 ? (
          <Experience onLoginRedirect={onLoginRedirect} responses={responses} setResponses={setResponses} step={step} setStep={setStep} user={user} />
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
          <Traffic responses={responses} setResponses={setResponses} step={step} setStep={setStep} />
          ) : null}
      </Form>
    </Container>
  );
}

export default UserForm;