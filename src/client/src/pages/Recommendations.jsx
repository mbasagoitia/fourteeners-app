import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Header from "../components/Header";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TopPeaksList from "../components/TopPeaksList";
import RoutesInfo from "../components/RoutesInfo";
import Weather from "../components/Weather";
import AdditionalInfo from "../components/AdditionalInfo";

function Recommendations() {
    const location = useLocation();
    const recommendedPeaks = location.state.data.peaks.peaks;
    const responses = location.state.responses;

    const topPeak = recommendedPeaks[0];

    const [currentPeak, setCurrentPeak] = useState(topPeak);

    return (
        <>
        <div className="rp-background">
            <Header />
            <Container fluid className="overlay" id="rp-container">
                    <Row className="mt-4">
                        <Col sm={5}>
                            {currentPeak === topPeak ? (
                            <h1 className="white-text d-block best-match-text">Your Best Match:</h1>
                            ): null}
                            <img src={topPeak.img} alt={topPeak.name} className="top-peak-img"/>
                            <h1 className="top-peak-name white-text">{topPeak.name}</h1>
                            <div className="white-text elevation-text">Elevation: {currentPeak.elevation.toLocaleString()} ft.</div>
                            <div className="white-text range-text">Range: {currentPeak.range}</div>
                            {currentPeak.distanceFromUser ? <div className="white-text distance-text">Distance from your location: {currentPeak.distanceFromUser}. (~{currentPeak.durationFromUser})</div> : null}
                        </Col>
                        <Col sm={7} className="d-flex flex-column">
                            <span className="top-peak-description white-text">{topPeak.description} You can find up-to-date trail and parking information, photos, and trip reports for {currentPeak.name} <a href={currentPeak.link} target="_blank" rel="noreferrer">here.</a></span>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col md={6} className="routes-col">
                            <Weather currentPeak={currentPeak} />
                        </Col>
                        <Col md={6} className="weather-col">
                            <RoutesInfo currentPeak={currentPeak} />
                            <AdditionalInfo currentPeak={currentPeak}/>  
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <TopPeaksList topPeak={topPeak} currentPeak={currentPeak} setCurrentPeak={setCurrentPeak} recommendedPeaks={recommendedPeaks} preferredRange={responses.range} />
                        </Col>
                    </Row>
            </Container>
        </div>
        </>
    )
}

export default Recommendations;