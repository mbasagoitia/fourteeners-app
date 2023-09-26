import mountainIicon from "../images/mountain-icon.svg";

function Home () {
    return (
        <>
        <div className="background">
            <div className="overlay-container">
                <div className="overlay-box">
                    <p className="overlay-content title">Ready for your next Colorado Fourteener adventure?</p>
                    <p className="overlay-content text italics">Let us help you find the perfect fit.</p>
                    <img src={mountainIicon} alt="mountain-icon" id="mountain-icon" />
                </div>
                <div className="overlay-box">
                    <p className="overlay-content text">We will find the best peak and route for your skill level and preferences, matching your input against extensive data on the 58 fourteeners in the state.</p>
                    <button className="overlay-content btn">Get Started</button>
                </div>
                <div className="overlay-box">
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
                    <div className="map-info">
                        <p className="overlay-content text">Interactive Map View</p>
                        <svg xmlns="http://www.w3.org/2000/svg" className="hp-icon" fill="#d48106" viewBox="0 0 16 16">
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home;