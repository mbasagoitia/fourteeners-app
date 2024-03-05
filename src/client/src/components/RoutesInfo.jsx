import { useState, useEffect } from 'react';
import RoutesTable from './RoutesTable';

function RoutesInfo ({ currentPeak }) {

    const [recommendedRoutes, setRecommendedRoutes] = useState([]);
    // I want to list all routes, so separate recommended routes out into separate component

    // Determining if a route is recommended or not.
    useEffect(() => {
        for (let route in currentPeak.routes) {
            // Route has all three of the user's preferred characteristics (length, gain, class)
            if (currentPeak.routes[route].preferredClass && currentPeak.routes[route].preferredGain && currentPeak.routes[route].preferredLength) {
                setRecommendedRoutes(prevState => [...prevState, route]);
            } else {
                // If all three preferences aren't possible, determine if it has two of the preferred characteristics
                if (currentPeak.routes[route].preferredLength && currentPeak.routes[route].preferredClass) {
                    setRecommendedRoutes(prevState => [...prevState, route]);
                }
                if (currentPeak.routes[route].preferredLength && currentPeak.routes[route].preferredGain) {
                    setRecommendedRoutes(prevState => [...prevState, route]);
                }
                if (currentPeak.routes[route].preferredGain && currentPeak.routes[route].preferredClass) {
                    setRecommendedRoutes(prevState => [...prevState, route]);
                }
            }
        }
    }, [currentPeak])

    return (
        <div className="d-flex flex-column align-items-start">
            <h2 className="white-text routes-title">Routes</h2>
            <RoutesTable currentPeak={currentPeak} recommendedRoutes={recommendedRoutes} />
            {recommendedRoutes.length > 0 ? (
            <div>
                <svg className="rr-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#d48106" viewBox="0 0 16 16">
                <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z"/>
            </svg> <span className="white-text recommended-route-text">Recommended route</span>
            </div>
        ): null}
        </div>
    )
}

export default RoutesInfo;