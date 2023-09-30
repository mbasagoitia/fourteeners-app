import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Map from '../components/Map';
import { useState } from 'react';

function UserForm ({ apiKey }) {

    const [step, setStep] = useState(1);
    const [userLocation, setUserLocation] = useState(null);

    const [responses, setResponses] = useState({
        experience: "1",
        location: userLocation,
        distance: "1-25",
        range: "0",
        class: "1",
        exposure: "1",
        traffic: "0",
        length: "0",
        gain: "0"
    });

    const [displayMap, setDisplayMap] = useState(false);
    const [locationName, setLocationName] = useState("");

    const handleNext = () => {
        if (step < 8) {
            setStep(step + 1);
        }
        console.log(responses);
    }

    const handlePrevious = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    }

    const [radioValue, setRadioValue] = useState(0);
    const handleRadioChange = (e) => {
        setRadioValue(e.target.value);
        if (radioValue == 0) {
            setDisplayMap(false);
                setUserLocation(null);
                // Major issues here with map
                setResponses((prevState) => ({
                    ...prevState,
                    location: userLocation,
                    distance: 0
                }))
        } else if (radioValue == 1) {
            setDisplayMap(true);
        }
    }

    return (
    <Form id="user-form">
        {step === 1 && (
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
                        Did you know that you can keep track of your fourteener progress? Create an account or login and visit this page!
                  </Form.Text>
                  <Button onClick={handleNext} className="d-block m-auto mt-4">Next</Button>
                  </>
        ) || null}
        {step === 2 && (
            <>
        <Form.Label htmlFor="location-radio-fieldset">Location information</Form.Label>
        <fieldset id="location-radio-fieldset">
          <Form.Check
            type="radio"
            id="location-radio-0"
            label="I am traveling from out of state/driving distance doesn't matter."
            name="location"
            value={0}
            checked={displayMap ? false : true}
            onChange={handleRadioChange}
          />
          <Form.Check
            type="radio"
            id="location-radio-1"
            label="I live in Colorado or will be staying in Colorado for my trip."
            name="location"
            value={1}
            checked={displayMap ? true : false}
            onChange={handleRadioChange}
          />
        </fieldset>
        {displayMap ? (
            <>
            <div>Please select your current location (or where you will be staying for your trip) by clicking anywhere on the map.</div>
            <Map apiKey={apiKey} setDisplayMap={setDisplayMap} setLocationName={setLocationName} setUserLocation={setUserLocation}/>
            {locationName ? (
                <>
                <div>Location set to {locationName}</div>
                <Form.Label htmlFor="distance-select">How far from your current location are you willing to drive?</Form.Label>
                <Form.Select aria-label="distance-select" id="distance-select" value={responses.distance} onChange={(e) => {
                    setResponses((prevState) => ({
                        ...prevState,
                        location: userLocation,
                        distance: e.target.value
                    }))
                }}>
                    <option value="1-25">1-25 miles</option>
                    <option value="26-50">26-50 miles</option>
                    <option value="51-100">51-100 miles</option>
                    <option value="101-200">101-200 miles</option>
                    <option value="201-300">201-300 miles</option>
                    <option value="300+">300+ miles</option>
                </Form.Select>
                </>
            ) : null}
            </>
        ) : null}
                <div className="btn-wrapper d-block mt-4">
                    <Button onClick={handlePrevious}>Back</Button>
                    <Button onClick={handleNext}>Next</Button>
                </div>
            </>
        ) || null}

        {step === 3 && (
            <>
        <Form.Label htmlFor="range-select">Would you like to explore a particular mountain range on your next hike?</Form.Label>
        <Form.Select aria-label="range-select" id="range-select" value={responses.range} onChange={(e) => {
                    setResponses((prevState) => ({
                        ...prevState,
                        range: e.target.value
                    }))
                }}>
            <option value={0}>No preference</option>
            <option value="elk">Elk Range</option>
            <option value="front">Front Range</option>
            <option value="mosquito">Mosquito Range</option>
            <option value="san juan">San Juan Range</option>
            <option value="sangre de cristo">Sangre de Cristo Range</option>
            <option value="sawatch">Sawatch Range</option>
            <option value="ten mile">Ten Mile Range</option>
        </Form.Select>
        <Form.Text id="class-description">
            Not familiar with the mountain ranges of Colorado? Read more about each range here.
        </Form.Text>
        <div className="btn-wrapper d-block mt-4">
            <Button onClick={handlePrevious}>Back</Button>
            <Button onClick={handleNext}>Next</Button>
        </div>
            </>
        ) || null}

        {step === 4 && (
            <>
        <Form.Label htmlFor="class-select">What is the highest class you are comfortable with?</Form.Label>
        <Form.Select aria-label="class-select" id="class-select" value={responses.class} onChange={(e) => {
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
            Not familiar with mountain classes? See our class guide here.
        </Form.Text>
        <div className="btn-wrapper d-block mt-4">
            <Button onClick={handlePrevious}>Back</Button>
            <Button onClick={handleNext}>Next</Button>
        </div>
            </>
        ) || null}

        {step === 5 && (
            <>
        <Form.Label htmlFor="exposure-select">What is the highest level of exposure you are comfortable with?</Form.Label>
        <Form.Select aria-label="exposure-select" id="exposure-select" value={responses.exposure} onChange={(e) => {
                    setResponses((prevState) => ({
                        ...prevState,
                        exposure: e.target.value
                    }))
                }}>
            <option value={1}>Little to no exposure</option>
            <option value={2}>Low exposure</option>
            <option value={3}>Medium exposure</option>
            <option value={4}>High exposure</option>
            <option value={5}>Very high exposure</option>
            <option value={6}>Extreme exposure</option>
        </Form.Select>
        <Form.Text id="exposure-description">
            Need help deciding? See the informational guide here.
        </Form.Text>
        <div className="btn-wrapper d-block mt-4">
            <Button onClick={handlePrevious}>Back</Button>
            <Button onClick={handleNext}>Next</Button>
        </div>
            </>
        ) || null}

        {step === 6 && (
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
            <Button onClick={handlePrevious}>Back</Button>
            <Button onClick={handleNext}>Next</Button>
        </div>
        </>
        ) || null}

        {step === 7 && (
            <>
            <Form.Label htmlFor="length-select">How long of a hike are you looking for?</Form.Label>
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
        <div className="btn-wrapper d-block mt-4">
            <Button onClick={handlePrevious}>Back</Button>
            <Button onClick={handleNext}>Next</Button>
        </div>
        </>
        ) || null}

        {step === 8 && (
            <>
        <Form.Label htmlFor="elevationGain-select">How much elevation gain would you prefer?</Form.Label>
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
        <div className="btn-wrapper d-block mt-4">
            <Button onClick={handlePrevious}>Back</Button>
            <Button variant="primary" type="submit">Submit</Button>
        </div>
        </>
        ) || null}
    </Form>
  );
}

export default UserForm;