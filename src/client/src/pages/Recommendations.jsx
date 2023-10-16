import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Header from "../components/Header";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TopPeaksList from "../components/TopPeaksList";

function Recommendations() {
    const location = useLocation();
    const recommendedPeaks = location.state.data.peaks.peaks;

    const topPeak = recommendedPeaks[0];

    const [apiKey, setApiKey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPeak, setCurrentPeak] = useState(topPeak);

    // Fetch the weather API key

    useEffect(() => {
        fetch("http://localhost:5000/api/weather-api-key")
        .then((res) => res.json())
        .then((data) => {
          setApiKey(data.weatherApiKey);
        })
        .catch((err) => {
          console.error("Error fetching API key:", err);
        });
      }, []);

    // Fetch the weather for the current peak

    useEffect(() => {
        if (apiKey) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currentPeak.latitude}&lon=${currentPeak.longitude}&appid=${apiKey}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("weather data", data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching weather data:", err);
            });
        }
    }, [apiKey, currentPeak]);

    const routesData = currentPeak.routes;
    const routesArray = Object.entries(routesData);

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
        <div className="rp-background">
            <Header />
            <Container fluid className="overlay">
                    <Row className="mt-4">
                        <Col sm={5}>
                            <span className="white-text d-block">Your Best Match:</span>
                            <img src={topPeak.img} alt={topPeak.name} className="top-peak-img"/>
                            <h1 className="top-peak-name white-text">{topPeak.name}</h1>
                        </Col>
                        <Col sm={7} className="d-flex flex-column justify-content-center">
                            <span className="top-peak-description white-text">{topPeak.description} You can find up-to-date trail and parking information, photos, and trip reports for {currentPeak.name} <a href={currentPeak.link} target="_blank" rel="noreferrer">here.</a></span>
                            <div className="down-arrow">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                </svg>
                            </div>
                            <div className="top-peak-weather">

                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={5}>
                            <div className="white-text">Elevation: {currentPeak.elevation} ft.</div>
                            <div className="white-text">Range: {currentPeak.range}</div>
                            {currentPeak.distanceFromUser ? <div className="white-text">Distance from your location: {currentPeak.distanceFromUser} (~{currentPeak.durationFromUser})</div> : null}
                        </Col>
                        <Col sm={7}>
                            <div className="routes-info white-text">
                                <span>Routes</span>
                                {routesArray.map(([routeName, routeInfo]) => {
                                    return (
                                        // This whole thing needs to be a new component that 
                                        // takes better advantage of the available space
                                        <div className="route" key={routeName}>
                                            <p>{routeName} Recommonded route?</p>
                                            <p>Difficulty: {routeInfo.difficulty}</p>
                                            <p>Length: {routeInfo.mileage}</p>
                                            <p>Elevation gain: {routeInfo.gain}</p>
                                            <p>Exposure: {routeInfo.exposure}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        {/* Current weather */}
                    </Row>
                    <Row>
                        { /* Make this a separate component */ }
                        <Col>
                            <TopPeaksList currentPeak={currentPeak} recommendedPeaks={recommendedPeaks} />
                        </Col>
                    </Row>
            </Container>
        </div>
        </>
    )
}

export default Recommendations;