import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';

function TopPeaksList ({ currentPeak, recommendedPeaks }) {

    const [isOpen, setIsOpen] = useState(true);
    const [radioValue, setRadioValue] = useState(0);

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

    const handleRadioChange = (e) => {
        setRadioValue(e.target.value);
        // The styles for the radio buttons need to be fixed on mobile. Smaller text!!!
    }

    return (
        <div className="fixed-bottom">
        <div className={`peaks-list-container ${!isOpen ? `collapsed` : ''}`}>
            {isOpen ? (
                <>
                <span className="list-text-wrapper"><span className="close-list-icon mx-4" onClick={() => setIsOpen(false)}><svg xmlns="http://www.w3.org/2000/svg" fill="#d48106" height="1em" viewBox="0 0 448 512"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg></span><p className="yellow-text recommended-text d-inline">Also recommended for you...</p></span>
                <div className="filter-options mt-3">
                    <fieldset id="filter-radio-fieldset">
                        <span>Filter by:</span>
                        <Form.Check
                        type="radio"
                        id="filter-radio-0"
                        label="Relevance"
                        name="relevance"
                        value={0}
                        checked={parseInt(radioValue) === 0}
                        onChange={handleRadioChange}
                        />
                    {currentPeak.distanceFromUser ? (
                        <Form.Check
                        type="radio"
                        id="filter-radio-1"
                        label="Distance"
                        name="disance"
                        value={1}
                        checked={parseInt(radioValue) === 1}
                        onChange={handleRadioChange}
                        />
                    ) : null}
                        <Form.Check
                        type="radio"
                        id="filter-radio-2"
                        label="Difficulty (low to high)"
                        name="difficulty-lo-hi"
                        value={2}
                        checked={parseInt(radioValue) === 2}
                        onChange={handleRadioChange}
                        />
                        <Form.Check
                        type="radio"
                        id="filter-radio-3"
                        label="Preferred Range"
                        name="range"
                        value={3}
                        checked={parseInt(radioValue) === 3}
                        onChange={handleRadioChange}
                        />
                        <Form.Check
                        type="radio"
                        id="filter-radio-4"
                        label="Traffic Level (low to high)"
                        name="traffic"
                        value={4}
                        checked={parseInt(radioValue) === 4}
                        onChange={handleRadioChange}
                        />
            </fieldset>
          </div>
          <hr className="rp-hr"></hr>
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
            ) : (
                <>
                {/* The spacing at the top of the footer is weird, also fix the design (space-between?) */}
                <svg onClick={() => setIsOpen(true)} xmlns="http://www.w3.org/2000/svg" height="1em" fill="#d48106" viewBox="0 0 448 512"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>
                <p className="yellow-text d-inline mx-2">Also recommended for you...</p> 
                </>
            )}
            </div>
        </div>
    )
}

export default TopPeaksList;