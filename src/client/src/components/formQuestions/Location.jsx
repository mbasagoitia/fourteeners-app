import NextButton from '../NextButton';
import PreviousButton from '../PreviousButton';
import Form from 'react-bootstrap/Form';
import Map from '../Map';
import { useEffect, useState } from 'react';

function Location({responses, setResponses, userLocation, setUserLocation, step, setStep}) {
    const [displayMap, setDisplayMap] = useState(false);
    const [locationName, setLocationName] = useState("");

    const [apiKey, setApiKey] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch("http://localhost:5000/api/api-key")
      .then((res) => res.json())
      .then((data) => {
        setApiKey(data.apiKey);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching API key:", err);
      });
    }, []);
  
    useEffect(()=> {
        setResponses((prevState) => ({
            ...prevState,
            location: userLocation
        }));
    }, [userLocation])

    const [radioValue, setRadioValue] = useState(0);
    
    const handleRadioChange = (e) => {
        setRadioValue(e.target.value);
        if (parseInt(e.target.value) === 0) {
            setDisplayMap(false);
            setLocationName("");
                setUserLocation(null);
                setResponses((prevState) => ({
                    ...prevState,
                    distance: 0
                }))
        } else if (parseInt(e.target.value) === 1) {
            setDisplayMap(true);
            setResponses((prevState) => ({
                ...prevState,
                distance: "1-25"
            }))
        }
    }

    if (loading) {
        return <div>Loading...</div>
      }

    return (
        <>
        <Form.Label htmlFor="location-radio-fieldset">Location information</Form.Label>
        <fieldset id="location-radio-fieldset">
          <Form.Check
            type="radio"
            id="location-radio-0"
            label="I am traveling from out of state/driving distance doesn't matter."
            name="location"
            value={0}
            checked={parseInt(radioValue) === 0}
            onChange={handleRadioChange}
          />
          <Form.Check
            type="radio"
            id="location-radio-1"
            label="I live in Colorado or will be staying in Colorado for my trip."
            name="location"
            value={1}
            checked={parseInt(radioValue) === 1}
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
            <PreviousButton step={step} setStep={setStep} />
        {(parseInt(radioValue) === 1 && userLocation !== null) || parseInt(radioValue) === 0 ? (
            <NextButton step={step} setStep={setStep} setResponses={setResponses} userLocation={userLocation}/>
            ) : null}
        </div>
    </>
    )
}

export default Location;