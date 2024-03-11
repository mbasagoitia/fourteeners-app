import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';

function TopPeaksList ({ currentPeak, setCurrentPeak, recommendedPeaks, preferredRange }) {

    const [isOpen, setIsOpen] = useState(false);

    // I only want to show the top peaks list immediately if it won't block too much of the vertical screen
    // space. So, below 1200px, the default position is closed. Once the window reaches 1200px,
    // all peaks are shown on page load.

    useEffect(() => {
        const screenWidth = window.innerWidth;
        setIsOpen(screenWidth >= 1200);

        const handleResize = () => {
            setIsOpen(window.innerWidth >= 1200);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // I want the next top recommended peaks to be shown immediately on larger screen sizes,
    // but with the option to move the footer out of the way so the content can be seen.
    // It will automatically close when the user scrolls down.
  
    useEffect(() => {
        const container = window.innerWidth < 768 ? document.querySelector(".fullsize-overlay-box") : document.querySelector(".overlay-container");
        const handleScroll = () => {
            if (container.scrollTop === 0) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };
    
        container.addEventListener('scroll', handleScroll);
    
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    
    }, []);
    
    const [currentList, setCurrentList] = useState(recommendedPeaks.sort((a, b) => parseInt(b.averageScore) - parseInt(a.averageScore)));
    const [selectedFilter, setSelectedFilter] = useState("relevance");

    const trafficLevels = {
        "low": 0,
        "medium": 1,
        "high": 2,
        "extreme": 3,
        "critical": 4
    }

    const handleRadioChange = (e) => {
        if (e.target.value === "relevance") {
            const sortedList = [...recommendedPeaks].sort((a, b) => parseInt(b.averageScore) - parseInt(a.averageScore));
            setCurrentList(sortedList);
            setSelectedFilter(e.target.value);
        } else if (e.target.value === "length") {
            const sortedList = [...recommendedPeaks].sort((a, b) => {
                let firstRouteA = a.routes[Object.keys(a.routes)[0]];
                let firstRouteB = b.routes[Object.keys(b.routes)[0]];
                return firstRouteA.mileage - firstRouteB.mileage;
            })
            setCurrentList(sortedList);
            setSelectedFilter(e.target.value);
        } else if (e.target.value === "distance" && currentPeak.distanceFromUser) {
            console.log("filtering by distance");
            const sortedList = [...recommendedPeaks].sort((a, b) => parseInt(a.distanceFromUser) - parseInt(b.distanceFromUser))
            setCurrentList(sortedList);
            setSelectedFilter(e.target.value);
        } else if (e.target.value === "difficulty") {
            console.log("filtering by difficulty");
            // The first route in each peak is the standard route, which determines the "class" of the mountain.
            // Therefore, each peak's difficulty can be determined by its first route's difficulty.
            const sortedList = [...recommendedPeaks].sort((a, b) => {
                let firstRouteA = a.routes[Object.keys(a.routes)[0]];
                let firstRouteB = b.routes[Object.keys(b.routes)[0]];
                return parseInt(firstRouteA.difficulty.match(/\d+/)[0]) - parseInt(firstRouteB.difficulty.match(/\d+/)[0]);
            })
            setCurrentList(sortedList);
            setSelectedFilter(e.target.value);
        } else if (e.target.value === "range" && preferredRange) {
            console.log("filtering by range");
            let filteredList = [...recommendedPeaks].filter((peak) => peak.range.toLowerCase() === preferredRange.toLowerCase())
            setCurrentList(filteredList);
            setSelectedFilter(e.target.value);
        } else if (e.target.value === "traffic") {
            console.log("filtering by traffic");
            const sortedList = [...recommendedPeaks].sort((a, b) => trafficLevels[a.traffic] - trafficLevels[b.traffic]);
            setCurrentList(sortedList);
            setSelectedFilter(e.target.value);
        }
    }

    return (
        <div className="fixed-bottom">
        <div className={`peaks-list-container ${!isOpen ? `collapsed` : ''}`}>
            {isOpen ? (
                <>
                <span className="list-text-wrapper">
                    <span onClick={() => setIsOpen(false)}><svg className="close-list-icon" xmlns="http://www.w3.org/2000/svg" fill="#d48106" height="1em" viewBox="0 0 448 512"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg></span>
                    <span className="white-text recommended-text mx-4">Also recommended for you...</span>
                </span>
                {/* This could be a separate component */}
                <div className="filter-options mt-3">
                    <fieldset id="filter-radio-fieldset">
                        <span>Filter by:</span>
                        <Form.Check
                        type="radio"
                        id="filter-radio-0"
                        label="Relevance"
                        name="filterRadioGroup"
                        value="relevance"
                        checked={selectedFilter === "relevance"}
                        onChange={handleRadioChange}
                        />
                        <Form.Check
                        type="radio"
                        id="filter-radio-1"
                        label="Length"
                        name="filterRadioGroup"
                        value="length"
                        checked={selectedFilter === "length"}
                        onChange={handleRadioChange}
                        />
                        {currentPeak.distanceFromUser ? (
                        <Form.Check
                        type="radio"
                        id="filter-radio-2"
                        label="Distance"
                        name="filterRadioGroup"
                        value="distance"
                        checked={selectedFilter === "distance"}
                        onChange={handleRadioChange}
                        />
                        ) : null}
                        <Form.Check
                        type="radio"
                        id="filter-radio-3"
                        label="Difficulty (low to high)"
                        name="filterRadioGroup"
                        value="difficulty"
                        checked={selectedFilter === "difficulty"}
                        onChange={handleRadioChange}
                        />
                        {preferredRange ? (
                        <Form.Check
                        type="radio"
                        id="filter-radio-4"
                        label="Preferred Range"
                        name="filterRadioGroup"
                        value="range"
                        checked={selectedFilter === "range"}
                        onChange={handleRadioChange}
                        />
                        ) : null}
                        <Form.Check
                        type="radio"
                        id="filter-radio-5"
                        label="Traffic Level (low to high)"
                        name="filterRadioGroup"
                        value="traffic"
                        checked={selectedFilter === "traffic"}
                        onChange={handleRadioChange}
                        />
            </fieldset>
          </div>
            <ul className="peaks-list white-text mt-2">
            {currentList.map((peak) => {
                return (
                    <li key={peak.id} onClick={() => setCurrentPeak(peak)} className="top-peak-li">
                    <span className="peak-name">{peak.name}</span>
                    <img className="peak-img d-block m-auto mt-1" src={peak.img} alt={peak.name} />
                    </li>
                )
            })}
            </ul>
            </>
            ) : (
                <>
                <svg onClick={() => setIsOpen(true)} className="open-list-icon mx-2" xmlns="http://www.w3.org/2000/svg" height="1em" fill="#d48106" viewBox="0 0 448 512"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>
                <p className="white-text d-inline recommended-text-collapsed">Also recommended for you...</p> 
                </>
            )}
            </div>
        </div>
    )
}

export default TopPeaksList;