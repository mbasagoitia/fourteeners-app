import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';

function TopPeaksList ({ topPeak, currentPeak, setCurrentPeak, recommendedPeaks, preferredRange }) {

    const [isOpen, setIsOpen] = useState(true);

    const [currentList, setCurrentList] = useState(recommendedPeaks.slice(1));

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY === 0) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }

    }, []);

    const trafficLevels = {
        "low": 0,
        "medium": 1,
        "high": 2,
        "extreme": 3,
        "critical": 4
    }

    const handleRadioChange = (e) => {
        // The radio change is working but the filter function is not working correctly.
        if (e.target.value === "relevance") {
            console.log("filtering by relevance");
            setCurrentList(recommendedPeaks);
        } else if (e.target.value === "length") {
            console.log("filtering by length");
            setCurrentList(recommendedPeaks.sort((a, b) => {
                let firstRouteA = a.routes[Object.keys(a.routes)[0]];
                let firstRouteB = b.routes[Object.keys(b.routes)[0]];

                return firstRouteA.mileage - firstRouteB.mileage;
            }))
        } else if (e.target.value === "distance" && currentPeak.distanceFromUser) {
            console.log("filtering by distance");
            setCurrentList(recommendedPeaks.sort((a, b) => a.distanceFromUser - b.distanceFromUser));
        } else if (e.target.value === "difficulty") {
            console.log("filtering by difficulty");
            // The first route in each peak is the standard route, which determines the "class" of the mountain.
            // Therefore, each peak's difficulty can be determined by its first route's difficulty.
            setCurrentList(recommendedPeaks.sort((a, b) => {
                let firstRouteA = a.routes[Object.keys(a.routes)[0]];
                let firstRouteB = b.routes[Object.keys(b.routes)[0]];
                return parseInt(firstRouteA.difficulty.match(/\d+/[0])) - parseInt(firstRouteB.difficulty.match(/\d+/)[0]);
            }));
        } else if (e.target.value === "range" && preferredRange) {
            console.log("filtering by range");
            setCurrentList(recommendedPeaks.filter((peak) => peak.range.toLowerCase() === preferredRange.toLowerCase()));
        } else if (e.target.value === "traffic") {
            console.log("filtering by traffic");
            setCurrentList(recommendedPeaks.sort((a, b) => trafficLevels[a.traffic] - trafficLevels[b.traffic]));
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
                <div className="filter-options mt-3">
                    <fieldset id="filter-radio-fieldset">
                        <span>Filter by:</span>
                        <Form.Check
                        type="radio"
                        id="filter-radio-0"
                        label="Relevance"
                        name="filterRadioGroup"
                        value="relevance"
                        defaultChecked={true}
                        onChange={handleRadioChange}
                        />
                        <Form.Check
                        type="radio"
                        id="filter-radio-1"
                        label="Length"
                        name="filterRadioGroup"
                        value="length"
                        onChange={handleRadioChange}
                        />
                        { /* Obviously change this */ }
                    {true ? (
                        <Form.Check
                        type="radio"
                        id="filter-radio-2"
                        label="Distance"
                        name="filterRadioGroup"
                        value="distance"
                        onChange={handleRadioChange}
                        />
                    ) : null}
                        <Form.Check
                        type="radio"
                        id="filter-radio-3"
                        label="Difficulty (low to high)"
                        name="filterRadioGroup"
                        value="difficulty"
                        onChange={handleRadioChange}
                        />
                        <Form.Check
                        type="radio"
                        id="filter-radio-4"
                        label="Preferred Range"
                        name="filterRadioGroup"
                        value="range"
                        onChange={handleRadioChange}
                        />
                        <Form.Check
                        type="radio"
                        id="filter-radio-5"
                        label="Traffic Level (low to high)"
                        name="filterRadioGroup"
                        value="traffic"
                        onChange={handleRadioChange}
                        />
            </fieldset>
          </div>
          <hr className="rp-hr"></hr>
            <ul className="peaks-list white-text">
            {currentList.map((peak) => {
                return (
                    <li key={peak.id}>
                    <span className="peak-name">{peak.name}</span>
                    <img className="peak-img d-block m-auto mt-1" src={peak.img} alt={peak.name} />
                    </li>
                )
            })}
            </ul>
            </>
            ) : (
                <>
                {/* The spacing at the top of the footer is weird, also fix the design (space-between?) */}
                <svg onClick={() => setIsOpen(true)} className="open-list-icon mx-2" xmlns="http://www.w3.org/2000/svg" height="1em" fill="#d48106" viewBox="0 0 448 512"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>
                <p className="white-text d-inline recommended-text-collapsed">Also recommended for you...</p> 
                </>
            )}
            </div>
        </div>
    )
}

export default TopPeaksList;