import { capitalize, camelCaseToWords } from "../helpers/capitalizeCamelCase";
import Table from 'react-bootstrap/Table';

const RoutesTable = ({ currentPeak, recommendedRoutes = null }) => {
    console.log(currentPeak);

    const routesData = currentPeak.routes;
    const routesArray = Object.entries(routesData);
    
    const exposureLabels = {
        0: "Very Low",
        1: "Low",
        2: "Medium",
        3: "High",
        4: "Very High",
        5: "Extreme"
    }

    return (
        <Table id="routes-table" striped bordered hover variant="dark" className="mb-1">
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
                        {recommendedRoutes && recommendedRoutes.includes(routeName) ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#d48106" viewBox="0 0 16 16">
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
    )
}

export default RoutesTable;