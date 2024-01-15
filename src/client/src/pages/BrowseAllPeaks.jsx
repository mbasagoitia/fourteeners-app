import IndividualPeak from "../components/IndividualPeak";

const BrowseAllPeaks = ({ peaks }) => {

    // Include the necessary information on a separate individual peak page
    // Include the summit selector rating (numeric values) represented by stars and any mountain-specific feedback
    // Also include the summit selector rating on the recommended peaks page

    const renderPeaksByRange = (peaks) => {
        const ranges = {};
      
        peaks.forEach((peak) => {
          if (!ranges[peak.range]) {
            ranges[peak.range] = [];
          }
          ranges[peak.range].push(peak);
        });

        return Object.keys(ranges).map((range) => (
            <div key={range}>
              <h2>{`${range} Range`}</h2>
              <div className="d-flex flex-wrap justify-content-center my-4">
              {ranges[range].map((peak) => (
                <IndividualPeak key={peak.id} peak={peak} />
              ))}
              </div>
            </div>
          ));
        };

    return (
        <>
        <h1>The Colorado Fourteeners</h1>
       {renderPeaksByRange(peaks)}
        </>
    )
}

export default BrowseAllPeaks;