import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { WiRain } from 'react-icons/wi';
import { FaCheckDouble } from 'react-icons/fa';
import { GiTrail } from 'react-icons/gi';

function Home() {
  const [fadeIn, setFadeIn] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [showRecs, setShowRecs] = useState(false);
  const [showTrailInfo, setShowTrailInfo] = useState(false);

  useEffect(() => {
    // Trigger the fade-in animation on page load
    setFadeIn(true);

    // Display each box with a delay
    const weatherTimer = setTimeout(() => setShowWeather(true), 500);
    const recsTimer = setTimeout(() => setShowRecs(true), 1000);
    const trailInfoTimer = setTimeout(() => setShowTrailInfo(true), 1500);

    // Clear timers on component unmount
    return () => {
      clearTimeout(weatherTimer);
      clearTimeout(recsTimer);
      clearTimeout(trailInfoTimer);
    };
  }, []);

  return (
    <div className="content-container">
        <div className="overlay-container">
            <div className="fullsize-overlay-box">
            <div className={`home-container ${fadeIn ? 'fade-in' : ''}`}>
            <div className="content">
                <h1 className="title">Summit Selector</h1>
                <p className="tagline">Your guide to the Colorado Fourteeners</p>
                <p className="description">
                Discover the perfect peak and route for your next adventure. Let us guide you through the tallest and most majestic peaks in the state.
                </p>
                <Link className="btn btn-primary" to="/summit-selector" id="get-started-btn">
                Get Started
                </Link>
            </div>
            <div className="hp-box-container">
            <div className={`info-box ${showWeather ? 'fade-in' : ''}`}>
            <div className="weather-info">
                <p className="overlay-content text">Current Weather Data</p>
                <WiRain size={40} style={{ color: "#d48106" }} />
            </div>
            </div>
            <div className={`info-box ${showRecs ? 'fade-in' : ''}`}>
                <div className="personalized-recommendations">
                    <p className="overlay-content text">Personalized Recommendations</p>
                    <FaCheckDouble size={25} style={{ color: "#d48106" }} />
                </div>
            </div>
            <div className={`info-box ${showTrailInfo ? 'fade-in' : ''}`}>
            <div className="trail-info">
                <p className="overlay-content text">Trail Information</p>
                <GiTrail size={30} style={{ color: "#d48106" }} />
            </div>
            </div>
            </div>
            </div>
            </div>
        </div>
    </div>
  );
}

export default Home;

