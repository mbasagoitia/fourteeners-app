import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Header from "../components/Header";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TopPeaksList from "../components/TopPeaksList";
import RoutesInfo from "../components/RoutesInfo";
import Weather from "../components/Weather";

function Recommendations() {
    const location = useLocation();
    const recommendedPeaks = location.state.data.peaks.peaks;

    const topPeak = recommendedPeaks[0];

    const [currentPeak, setCurrentPeak] = useState(topPeak);

    return (
        <>
        <div className="rp-background">
            <Header />
            <Container fluid className="overlay" id="rp-container">
                    <Row className="mt-4">
                        <Col sm={5}>
                            <h1 className="white-text d-block best-match-text">Your Best Match:</h1>
                            <img src={topPeak.img} alt={topPeak.name} className="top-peak-img"/>
                            <h1 className="top-peak-name white-text">{topPeak.name}</h1>
                            <div className="white-text">Elevation: {currentPeak.elevation.toLocaleString()} ft.</div>
                            <div className="white-text">Range: {currentPeak.range}</div>
                            {currentPeak.distanceFromUser ? <div className="white-text">Distance from your location: {currentPeak.distanceFromUser} (~{currentPeak.durationFromUser})</div> : null}
                        </Col>
                        <Col sm={7} className="d-flex flex-column">
                            <span className="top-peak-description white-text">{topPeak.description} You can find up-to-date trail and parking information, photos, and trip reports for {currentPeak.name} <a href={currentPeak.link} target="_blank" rel="noreferrer">here.</a></span>
                            {/* <div className="down-arrow">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                </svg>
                            </div> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <Weather currentPeak={currentPeak} />
                        </Col>
                        <Col sm={6}>
                            <RoutesInfo currentPeak={currentPeak} />
                            {/* Add in relevant links to safety information, reminders, leave a review, etc. */}
                        </Col>
                    </Row>
                    <Row>
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