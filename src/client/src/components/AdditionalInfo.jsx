import { Link } from "react-router-dom";

function AdditionalInfo({ currentPeak }) {
    {/* Add in relevant links to safety information, reminders, leave a review, etc. */}
    return (
        <>
        <h2 className="ready-text white-text mt-4">Ready to hike?</h2>
        <div className="additional-info white-text">
            <p>Be sure to review our <Link to={"#"}>safety guide</Link> and list of the <Link to={"#"}>ten hiking essentials.</Link></p>
            <p>While this guide provides some weather and trail information, it's crucial to consult external sources to safely plan your trip. Please read <Link to={"#"}>this safety disclaimer.</Link></p>
            <p>Have you already hiked {currentPeak.name}? <Link to={"#"}>Add it to your list</Link> and <Link to={"#"}>leave a review!</Link></p>
        </div>
        </>
    )
}

export default AdditionalInfo;