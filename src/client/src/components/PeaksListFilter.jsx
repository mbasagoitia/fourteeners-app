import React, { useState } from 'react';
import { Form, ListGroup, Button, Container, Row, Col } from 'react-bootstrap';
import SearchablePeaksList from './SearchablePeaksList';

const PeaksListFilter = ({
  setCompletedPeaks,
  peaks,
  newCompletedPeaks,
  setNewCompletedPeaks,
  handleNewPeaksSubmit,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPeaks, setSelectedPeaks] = useState([]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleItemClick = (peak) => {
    const isSelected = selectedPeaks.includes(peak);
    const updatedPeaks = isSelected
      ? selectedPeaks.filter((item) => item !== peak)
      : [...selectedPeaks, peak];

    setSelectedPeaks(updatedPeaks);

    if (isSelected) {
      setNewCompletedPeaks((prev) => prev.filter((item) => item !== peak));
    } else {
      setNewCompletedPeaks((prev) => [...prev, peak]);
    }
  };

  const handleAddToList = () => {
    handleNewPeaksSubmit();
    setCompletedPeaks((prev) => [...prev, ...newCompletedPeaks]);
    setSelectedPeaks([]);
    setIsExpanded(false);
  };

  const isPeakSelected = (peak) => {
    return selectedPeaks.includes(peak);
  };

  return (
    <div className="mt-4">
      <div className="addPeaksBar">
        <span onClick={toggleExpand}>
        {isExpanded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="mb-1 mx-1"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="mb-1 mx-1"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          )}
          Add Peaks
        </span>
      </div>
      <div style={{ maxHeight: isExpanded ? '40vh' : '5vh', overflowY: 'scroll' }} className="peaks-list-filter mt-2">
        {isExpanded && (
          <Container className="add-peaks-area">
            <Row>
              <Col xs={8} className="filter-list-area">
                <SearchablePeaksList
                  items={peaks}
                  onItemClick={handleItemClick}
                  isItemSelected={isPeakSelected}
                />
              </Col>
              <Col xs={4}>
                <div className="added-peaks-area">
                  {selectedPeaks && selectedPeaks.length > 0 ? (
                    <Button onClick={handleAddToList}>Add To List</Button>
                  ) : null}
                  <div className="peaks-to-add mt-2" style={{ maxHeight: '25vh', overflowY: 'auto' }}>
                    <ul className="peaks-to-add-list">
                      {selectedPeaks ? selectedPeaks.map((peak, idx) => <li key={idx}>{peak.name}</li>) : null}
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </div>
  );
};

export default PeaksListFilter;
