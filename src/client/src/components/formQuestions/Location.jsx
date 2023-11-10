import NextButton from '../NextButton';
import PreviousButton from '../PreviousButton';
import Form from 'react-bootstrap/Form';
import Map from '../Map';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

function Location({responses, setResponses, userLocation, setUserLocation, step, setStep}) {
    const location = useLocation();

    const [displayMap, setDisplayMap] = useState(false);
    const [locationName, setLocationName] = useState("");

    const [apiKey, setApiKey] = useState(null);
    const [loading, setLoading] = useState(true);

    const [radioValue, setRadioValue] = useState(() => {
        if (location.state && location.state.showForm && location.state.responses.location) {
          return location.state.responses.location ? 1 : 0;
        }
        return 0;
      });
    
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
            setRadioValue(e.target.value);
            setDisplayMap(true);
            setResponses((prevState) => ({
                ...prevState,
                distance: "1-25"
            }))
        }
    }
  
    useEffect(() => {
      fetch("http://localhost:5000/api/maps-api-key")
      .then((res) => res.json())
      .then((data) => {
        setApiKey(data.mapsApiKey);
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

    useEffect(() => {
        if (location.state && location.state.responses.location) {
            setDisplayMap(true);
            setUserLocation(location.state.responses.location);
          const storedLocationName = localStorage.getItem('locationName');
          if (storedLocationName) {
            setLocationName(storedLocationName);
          } else {
            setLocationName('');
          }
        } else {
            setDisplayMap(false);
            setUserLocation(null);
        }
      }, [location.state]);

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
            defaultChecked={location.state ? location.state.responses && !location.state.responses.location : true}
            onChange={handleRadioChange}
          />
          <Form.Check
            type="radio"
            id="location-radio-1"
            label="I live in Colorado or will be staying in Colorado for my trip."
            name="location"
            value={1}
            defaultChecked={location.state ? location.state.responses && location.state.responses.location : false}
            onChange={handleRadioChange}
          />
        </fieldset>
        {displayMap ? (
            <>
            <div className="my-4">Please select your location in Colorado (or where you will be staying for your trip) by clicking anywhere on the map.</div>
            <Map apiKey={apiKey} setDisplayMap={setDisplayMap} setLocationName={setLocationName} setUserLocation={setUserLocation} setRadioValue={setRadioValue} setResponses={setResponses} />
            {locationName ? (
                <>
                <div className="yellow-text">Location set to {locationName}</div>
                <Form.Label htmlFor="distance-select" className="mt-4">How far from your current location are you willing to drive?</Form.Label>
                <Form.Select aria-label="distance-select" id="distance-select" value={responses.distance} onChange={(e) => {
                    setResponses((prevState) => ({
                        ...prevState,
                        location: userLocation,
                        distance: e.target.value
                    }))
                }}>
                    <option value={1}>25 miles</option>
                    <option value={2}>50 miles</option>
                    <option value={3}>100 miles</option>
                    <option value={4}>200 miles</option>
                    <option value={5}>300 miles</option>
                    <option value={6}>300+ miles</option>
                </Form.Select>
                </>
            ) : null}
            </>
        ) : null}
        <div className="btn-wrapper mt-4">
            <PreviousButton step={step} setStep={setStep} />
        {(parseInt(radioValue) === 1 && userLocation !== null) || parseInt(radioValue) === 0 ? (
            <NextButton step={step} setStep={setStep} setResponses={setResponses} userLocation={userLocation}/>
            ) : null}
        </div>
    </>
    )
}

export default Location;