import { useState, useEffect } from "react";
import PhotoCollection from "../components/PhotoCollection";

function CompletedPeakDetails ({ peak, photos }) {
    // Make sure to include a close button for the overlays
    const dateCompleted = peak.date_completed;

    return (
        <div className="cp-details">
            <h1>{peak.name}</h1>  
            <img src={`${peak.img}`} alt={`${peak.name}`} />
            <p>{peak.elevation}</p>
            <p>{peak.range}</p>
            <p>{peak.description}</p>
            {dateCompleted ? <p>{`Completed on ${dateCompleted}`}</p> : null}
            {photos && photos.length > 0 ? <PhotoCollection images={photos} /> : null}
        </div>
      );
}

export default CompletedPeakDetails;