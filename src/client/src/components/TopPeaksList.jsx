import { useEffect, useState } from "react";

function TopPeaksList ({ currentPeak, recommendedPeaks }) {

    const [isOpen, setIsOpen] = useState(true);

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

    return (
        <div className="fixed-bottom">
        <div className={`peaks-list-container ${!isOpen ? `collapsed` : ''}`}>
            {isOpen ? (
                <>
                <div className="top-peaks-filter d-flex">
                <p className="white-text recommended-text">Also recommended for you...</p>
                <div>Filter by...</div>
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