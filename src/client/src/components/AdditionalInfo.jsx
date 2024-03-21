import { Link } from "react-router-dom";

const AdditionalInfo = ({ currentPeak }) => {
    return (
        <>
        <h2 className="ready-text white-text mt-4">Ready to hike?</h2>
        <div className="additional-info white-text">
            <p>Be sure to review our <Link to={"/mountain-safety"}>safety guide</Link> and list of the ten hiking essentials.</p>
            <p>While this guide provides some weather and trail information, it's crucial to consult external sources to safely plan your trip. Please read this <a href="/mountain-safety#disclaimer">Safety Disclaimer</a>.</p>
            <p>Have you already hiked {currentPeak.name}? <Link to={"/my-list"}>Add it to your list</Link> and <Link to={"/provide-feedback"}>leave a review!</Link></p>
        </div>
        </>
    )
}

export default AdditionalInfo;