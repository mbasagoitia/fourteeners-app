import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

function RoutesInfo ({ currentPeak }) {

    const [recommendedRoutes, setRecommendedRoutes] = useState([]);

    // Write the logic for determining if a route is recommended or not.
    useEffect(() => {
        for (let route in currentPeak.routes) {
            if (currentPeak.routes[route].preferredClass && currentPeak.routes[route].preferredGain && currentPeak.routes[route].preferredLength) {
                setRecommendedRoutes(prevState => [...prevState, route]);
            } else {
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

    const routesData = currentPeak.routes;
    const routesArray = Object.entries(routesData);

    function camelCaseToWords(words) {
        let separatedWords = words.replace(/([a-z])([A-Z])/g, '$1 $2');
        return capitalize(separatedWords);
    }

    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const exposureLabels = {
        0: "Very Low",
        1: "Low",
        2: "Medium",
        3: "High",
        4: "Very High",
        5: "Extreme"
    }

    return (
            <div className="d-flex flex-column align-items-start">
            <h2 className="white-text routes-title">Routes</h2>
            <Table id="routes-table" striped bordered hover variant="dark" className='mb-1'>
                <thead>
                    <tr>
                        <th>Route Name</th>
                        <th>Length</th>
                        <th>Gain</th>
                        <th>Difficulty</th>
                        <th>Exposure</th>
                    </tr>
                </thead>
                <tbody>
            {routesArray.map(([routeName, routeInfo]) => {

                let exposureLevel;

                for (let key in exposureLabels) {
                    if (parseInt(key) === routeInfo.exposure) {
                        exposureLevel = exposureLabels[key];
                    }
                }
                
                return (
                      <tr key={routeName}>
                        <td>
                            {recommendedRoutes.includes(routeName) ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#d48106" viewBox="0 0 16 16">
                            <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z"/>
                            </svg> 
                        : null} {camelCaseToWords(routeName)}</td>
                        <td>{routeInfo.mileage} miles</td>
                        <td>{routeInfo.gain.toLocaleString()} ft.</td>
                        <td>{capitalize(routeInfo.difficulty)}</td>
                        <td>{exposureLevel}</td>
                      </tr>
                )
            })}
            </tbody>
        </Table>
        {recommendedRoutes.length > 0 ? (
            <div>
            <svg classname="rr-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#d48106" viewBox="0 0 16 16">
            <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z"/>
            </svg> <span className="white-text recommended-route-text">Recommended route</span>
            </div>
        ): null}
        </div>
    )
}

export default RoutesInfo;