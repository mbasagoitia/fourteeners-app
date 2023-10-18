import { useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';

function TopPeaksList ({ currentPeak, recommendedPeaks }) {

    const [isOpen, setIsOpen] = useState(true);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (window.scrollY === 0) {
    //             setIsOpen(true);
    //         } else {
    //             setIsOpen(false);
    //         }
    //     }

    //     window.addEventListener("scroll", handleScroll);

    //     return () => {
    //         window.removeEventListener("scroll", handleScroll);
    //     }

    // }, []);

    return (
        <div className="fixed-bottom">
        <div className={`peaks-list-container ${!isOpen ? `collapsed` : ''}`}>
            {isOpen ? (
                <>
                {/* The footer spacing here is really weird */}
                <span className="white-text recommended-text">Also recommended for you...</span>
                <div className="top-peaks-filter d-flex flex-column">
                <div>
                    <span className="close-list-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="white" height="1em" viewBox="0 0 448 512"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg></span>
                </div>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Filter By:
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Relevance</Dropdown.Item>
                        <Dropdown.Item href="#/action-1">Distance</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Difficulty (Lowest to Highest)</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Difficulty (Highest to Lowest)</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Range</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <div>Relevance</div>
                {currentPeak.distanceFromUser ? <div>Distance</div> : null}
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
            </>
            ) : <button onClick={() => setIsOpen(true)}>Show Content</button>}
        </div>
        </div>
    )
}

export default TopPeaksList;