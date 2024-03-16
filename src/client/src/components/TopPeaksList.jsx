import { useEffect, useState } from "react";
import FilterOptions from "./FilterOptions";
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';

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

    // The next top recommended peaks will be shown immediately on larger screen sizes,
    // but with the option to move the footer out of the way so the content can be seen.
    // It will automatically close when the user scrolls down.
  
    useEffect(() => {
        const container = document.querySelector(".fullsize-overlay-box");
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
            const sortedList = [...recommendedPeaks].sort((a, b) => parseInt(a.distanceFromUser) - parseInt(b.distanceFromUser))
            setCurrentList(sortedList);
            setSelectedFilter(e.target.value);
        } else if (e.target.value === "difficulty") {
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
            let filteredList = [...recommendedPeaks].filter((peak) => peak.range.toLowerCase() === preferredRange.toLowerCase())
            setCurrentList(filteredList);
            setSelectedFilter(e.target.value);
        } else if (e.target.value === "traffic") {
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
                    <span onClick={() => setIsOpen(false)}><FaCaretDown className="close-list-icon" size={15} /></span>
                    <span className="white-text recommended-text mx-2">Also recommended for you...</span>
                </span>
                <FilterOptions selectedFilter={selectedFilter} handleRadioChange={handleRadioChange} currentPeak={currentPeak} preferredRange={preferredRange} />
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
                <span onClick={() => setIsOpen(true)} className="open-list-icon mx-2"><FaCaretUp size={15} /></span>
                <p className="white-text d-inline recommended-text-collapsed">Also recommended for you...</p> 
                </>
            )}
            </div>
        </div>
    )
}

export default TopPeaksList;