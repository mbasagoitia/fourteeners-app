import { useLocation } from "react-router";

function Recommendations() {
    const location = useLocation();
    const recommendedPeaks = location.state.data.suggestedPeaks;
    return (
        <>
        <ul className="peaks-list">
        {recommendedPeaks.map((peak) => {
            return (
                <li key={peak.id}>
                <span>{peak.name}</span>
                <img className="peak-img d-block m-auto" src={peak.img} alt={peak.name} />
                </li>
            )
        })}
        </ul>
        </>
    )
}

export default Recommendations;