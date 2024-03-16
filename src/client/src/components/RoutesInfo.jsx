import { useState, useEffect } from 'react';
import RoutesTable from './RoutesTable';
import { FaStarOfLife } from 'react-icons/fa';

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
            <div className="routes-wrapper">
                <RoutesTable currentPeak={currentPeak} recommendedRoutes={recommendedRoutes} />
            </div>
            {recommendedRoutes.length > 0 ? (
            <div className="mt-1">
                <span className="star-icon"><FaStarOfLife size={15} color="#d48106" /></span><span className="white-text recommended-route-text">Recommended route</span>
            </div>
        ): null}
        </div>
    )
}

export default RoutesInfo;