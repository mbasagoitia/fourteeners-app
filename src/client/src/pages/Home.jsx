import mountainIcon from "../images/mountain-icon.svg";
import { Link } from 'react-router-dom';

function Home () {

    return (
        <div className="content-container">
            <div className="overlay-container">
                <div className="overlay-box">
                    <p className="overlay-content title">Ready for your next Colorado Fourteener adventure?</p>
                    <p className="overlay-content text italics">Let us help you find the perfect fit.</p>
                    <img src={mountainIcon} alt="mountain-icon" id="mountain-icon" />
                </div>
                <div className="overlay-box">
                    <p className="overlay-content text">We will find the best peak and route for your skill level and preferences, matching your input against extensive data on the fifty-eight 14,000+ feet peaks in the state.</p>
                    <Link className="overlay-content btn btn-primary" to={"/summit-selector"}>Get Started</Link>
                </div>
                <div className="overlay-box">
                    <div className="personalized-recommendations">
                        <p className="overlay-content text">Personalized Recommendations</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#d48106" viewBox="0 0 16 16">
                        <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
                        <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"/>
                        </svg>
                    </div>
                    <div className="trail-info">
                        <p className="overlay-content text">Trail Information</p>
                        <svg xmlns="http://www.w3.org/2000/svg" className="hp-icon" fill="#d48106" viewBox="0 0 16 16">
                        <path d="M7 1.414V4H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h5v6h2v-6h3.532a1 1 0 0 0 .768-.36l1.933-2.32a.5.5 0 0 0 0-.64L13.3 4.36a1 1 0 0 0-.768-.36H9V1.414a1 1 0 0 0-2 0zM12.532 5l1.666 2-1.666 2H2V5h10.532z"/>
                        </svg>
                    </div>
                    <div className="weather-info">
                        <p className="overlay-content text">Current Weather Data</p>
                        <svg xmlns="http://www.w3.org/2000/svg" id="weather-icon" className="hp-icon" fill="#d48106" viewBox="0 0 16 16">
                        <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973zM8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 2z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;