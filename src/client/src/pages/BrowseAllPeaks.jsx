import IndividualPeak from "../components/IndividualPeak";
import Container from 'react-bootstrap/Container';

const BrowseAllPeaks = ({ peaks }) => {

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
              <div className="browse-peaks-wrapper my-4">
              {ranges[range].map((peak) => (
                <IndividualPeak key={peak.id} peak={peak} />
              ))}
              </div>
            </div>
          ));
        };

    return (
        <div className="content-container">
            <Container className="details-container">
              <div className="overlay-container">
                <div className="fullsize-overlay-box">
                  <h1 className="mb-4">The Colorado Fourteeners</h1>
                  {renderPeaksByRange(peaks)}
              </div>
            </div>
          </Container>
        </div>
    )
}

export default BrowseAllPeaks;