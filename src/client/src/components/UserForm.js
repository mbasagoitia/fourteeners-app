import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Map from '../components/Map';
import { useState, useEffect } from 'react';

function UserForm ({ apiKey }) {

    const [step, setStep] = useState(1);
    const [userLocation, setUserLocation] = useState(null);

    const [experienceLevelAcknowledged, setExperienceLevelAcknowledged] = useState(false);

    const [responses, setResponses] = useState({
        experience: "1",
        class: "1",
        classPreference: [],
        exposure: "1",
        length: "0",
        gain: "0",
        location: userLocation,
        distance: "0",
        range: "0",
        traffic: "0"
    });

    const [displayMap, setDisplayMap] = useState(false);
    const [locationName, setLocationName] = useState("");

    useEffect(()=> {
        setResponses((prevState) => ({
            ...prevState,
            location: userLocation
        }));
    }, [userLocation])

    const handleNext = () => {
        if (step < 8) {
            setStep(step + 1);
            if (step === 5) {
                setResponses((prevState) => ({
                    ...prevState,
                    location: userLocation
                }))
            }
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
        if (e.target.value == 0) {
            setDisplayMap(false);
            setLocationName("");
                setUserLocation(null);
                setResponses((prevState) => ({
                    ...prevState,
                    distance: 0
                }))
        } else if (e.target.value == 1) {
            setDisplayMap(true);
            setResponses((prevState) => ({
                ...prevState,
                distance: "1-25"
            }))
        }
    }

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
                        Did you know that you can keep track of your fourteener progress? Visit this page to view or edit your list!
                  </Form.Text>
                  {responses.experience !== "1" ? (
                        <Form.Check
                        type="checkbox"
                        label="Only show me peaks that I have not hiked before (you must log in for this feature)"
                        id="experience-checkbox"
                    />
                  ) : null} 
                  <Button onClick={handleNext} className="d-block m-auto mt-4">Next</Button>
                  </>
        ) || null}
        {step === 2 && (
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
                Not familiar with mountain classes? See our class guide here.
            </Form.Text>
            {/* Verify that the user has checked the warning box before showing next button */}
            {responses.experience === "1" && responses.class !== "1" ? (
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
                <Form.Label>Please select (if any) which class peaks you would prefer to hike/climb.</Form.Label>
                {classPreferenceCheckboxes}
                </>
            ) : null}
            { /* Now figure out how to conditionally render the buttons. Will be if the experience level is acknowledged or if the experience is high enough. */ }
            <div className="btn-wrapper d-block mt-4">
                <Button onClick={handlePrevious}>Back</Button>
                <Button onClick={handleNext}>Next</Button>
            </div>
            </>
        ) || null}
        {step === 3 && (
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
            {responses.experience === "1" && (responses.exposure !== "1" && responses.exposure !== "2") ? (
                <div id="exposure-warning">
                    <p>You have indicated that you have never hiked a fourteener before. We recommend that you start with peaks that have low exposure for your first hike.</p>
                    <Form.Check
                        type="checkbox"
                        label={`I verify that I am comfortable with higher levels of exposure.`}
                        id="exposure-warning-checkbox"
                    />
                    </div>
            ) : null}
            <div className="btn-wrapper d-block mt-4">
                <Button onClick={handlePrevious}>Back</Button>
                <Button onClick={handleNext}>Next</Button>
            </div>
                </>
        ) || null}

        {step === 4 && (
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
            <Button onClick={handleNext}>Next</Button>
        </div>
         </>
        ) || null}

        {step === 5 && (
             <>
             <Form.Label htmlFor="location-radio-fieldset">Location information</Form.Label>
             <fieldset id="location-radio-fieldset">
               <Form.Check
                 type="radio"
                 id="location-radio-0"
                 label="I am traveling from out of state/driving distance doesn't matter."
                 name="location"
                 value={0}
                 checked={radioValue == 0}
                 onChange={handleRadioChange}
               />
               <Form.Check
                 type="radio"
                 id="location-radio-1"
                 label="I live in Colorado or will be staying in Colorado for my trip."
                 name="location"
                 value={1}
                 checked={radioValue == 1}
                 onChange={handleRadioChange}
               />
             </fieldset>
             {displayMap ? (
                 <>
                 <div>Please select your current location (or where you will be staying for your trip) by clicking anywhere on the map.</div>
                 <Map apiKey={apiKey} setDisplayMap={setDisplayMap} setLocationName={setLocationName} setUserLocation={setUserLocation} setRadioValue={setRadioValue} setResponses={setResponses} />
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
                 {(radioValue == 1 && userLocation !== null) || radioValue == 0 ? (
                     <Button onClick={handleNext}>Next</Button>
                     ) : null}
                 </div>
                 </>
        ) || null}

        {step === 6 && (
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

        {step === 7 && (
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
                 <Button onClick={() => {console.log("finished")}}>Finish</Button>
             </div>
             </>
        ) || null}
    </Form>
  );
}

export default UserForm;