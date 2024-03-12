import { capitalize, camelCaseToWords } from "../helpers/capitalizeCamelCase";
import Table from 'react-bootstrap/Table';
import { FaStarOfLife } from 'react-icons/fa';

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
                        {recommendedRoutes && recommendedRoutes.includes(routeName) ? <FaStarOfLife size={15} color="#d48106" />
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