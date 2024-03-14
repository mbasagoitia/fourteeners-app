import IndividualPeak from '../components/IndividualPeak';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import getRanges from "../helpers/getRanges";

const BrowseAllPeaks = ({ peaks }) => {

  const renderPeaksByRange = (ranges) => {
    return Object.keys(ranges).map((range) => (
      <div key={range} id={range.toLowerCase().replace(/\s/g, '-')}>
        <h2>{`${range} Range`}</h2>
        <div className="browse-peaks-wrapper my-4">
          {ranges[range].map((peak) => (
            <IndividualPeak key={peak.id} peak={peak} />
          ))}
        </div>
      </div>
    ));
  };

  const ranges = getRanges(peaks);

  return (
    <Container fluid>
      <Row className="ss-row">
        <Col md={3} className="sidebar d-none d-md-block">
          <div className="form-overlay-box">
            <div className="guide-sidebar-container">
              <p>Jump to Section</p>
              <ul>
                {Object.keys(ranges).map((range) => (
                  <li key={range}>
                    <a href={`#${range.toLowerCase().replace(/\s/g, '-')}`}>{range}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Col>
        <Col md={9}>
          <div className="overlay-container">
            <div className="form-overlay-box browse-all">
              <h1 className="mb-4">The Colorado Fourteeners</h1>
              {renderPeaksByRange(ranges)}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BrowseAllPeaks;
