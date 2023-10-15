import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Header from "../components/Header";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
                console.log(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching weather data:", err);
            });
        }
    }, [apiKey, currentPeak]);

    const routesData = currentPeak.routes;
    const routesArray = Object.entries(routesData);
    console.log("routes array:", routesArray);

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
        <div className="background">
            <Header />
            <Container fluid className="overlay">
                    <Row className="mt-4">
                        <Col sm={5}>
                            <span className="white-text d-block">Your Best Match:</span>
                            <img src={topPeak.img} alt={topPeak.name} className="top-peak-img"/>
                            <h1 className="top-peak-name white-text">{topPeak.name}</h1>
                        </Col>
                        <Col sm={7} className="d-flex align-items-center">
                            <span className="top-peak-description white-text">{topPeak.description} You can find up-to-date trail and parking information, photos, and trip reports for {currentPeak.name} <a href={currentPeak.link} target="_blank" rel="noreferrer">here.</a></span>
                            <div className="top-peak-weather">

                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={5}>
                            <div className="white-text">Elevation: {currentPeak.elevation} ft.</div>
                            <div className="white-text">Range: {currentPeak.range}</div>
                            <div className="white-text">Distance from your location: {currentPeak.distanceFromUser} (~{currentPeak.durationFromUser})</div>
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
                        <Col className="peaks-list-container fixed-bottom">
                            <div className="top-peaks-filter d-flex">
                                <p className="white-text recommended-text">Also recommended for you...</p>
                                <div>Filter by...</div>
                                <div>Relevance</div>
                                <div>Distance</div>
                                <div>Difficulty (lowest to highest)</div>
                                <div>Difficulty (highest to lowest)</div>
                                <div>Range</div>
                            </div>
                            <ul className="peaks-list white-text">
                            {recommendedPeaks.map((peak) => {
                                return (
                                    <li key={peak.id}>
                                    <span>{peak.name}</span>
                                    <img className="peak-img d-block m-auto" src={peak.img} alt={peak.name} />
                                    </li>
                                )
                            }).slice(1)}
                            </ul>
                        </Col>
                    </Row>
            </Container>
        </div>
        </>
    )
}

export default Recommendations;