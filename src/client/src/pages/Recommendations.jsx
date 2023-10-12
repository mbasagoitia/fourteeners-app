import { useLocation } from "react-router";
import Header from "../components/Header";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// Re-lay this out using react bootstrap grid system.

function Recommendations() {
    const location = useLocation();
    const recommendedPeaks = location.state.data.peaks.peaks;

    const topPeak = recommendedPeaks[0];

    return (
        <>
        <div className="background">
            <Header />
            <div className="recommendations-overlay-container">
                <div className="recommendations-overlay-box">
                    <div className="top-peak-wrapper">
                        <div className="top-peak-img-wrapper">
                            <img src={topPeak.img} alt={topPeak.name} className="top-peak-img"/>
                            <h1 className="top-peak-name white-text">{topPeak.name}</h1>
                        </div>
                        <div className="top-peak-info-wrapper">
                            <p className="top-peak-description">{topPeak.description}</p>
                        </div>
                    </div>
                    <ul className="peaks-list">
                    {recommendedPeaks.map((peak) => {
                        return (
                            <li key={peak.id}>
                            <span>{peak.name}</span>
                            <img className="peak-img d-block m-auto" src={peak.img} alt={peak.name} />
                            </li>
                        )
                    })}
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}

export default Recommendations;