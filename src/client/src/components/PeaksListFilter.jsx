import { useState } from 'react';
import {  Button, Row, Col } from 'react-bootstrap';
import SearchablePeaksList from './SearchablePeaksList';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';

const PeaksListFilter = ({ setCompletedPeaks, peaks, newCompletedPeaks, setNewCompletedPeaks, handleNewPeaksSubmit }) => {
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
    <div className="mt-4 w-100">
      <div className="addPeaksBar">
        <span onClick={toggleExpand}>
        {isExpanded ? (
            <FaMinusCircle size={15} />
          ) : (
            <FaPlusCircle size={15} />
          )}
          Add Peaks
        </span>
      </div>
      <div className="peaks-list-filter mt-2" style={{ display: isExpanded ? "block" : "none" }}>
        {isExpanded && (
          <div className="add-peaks-area">
            <Row>
              <Col xs={6} className="filter-list-area">
                <SearchablePeaksList
                  items={peaks}
                  onItemClick={handleItemClick}
                  isItemSelected={isPeakSelected}
                />
              </Col>
              <Col xs={6}>
                <div className="added-peaks-area">
                  {selectedPeaks && selectedPeaks.length > 0 ? (
                    <Button onClick={handleAddToList}>Save</Button>
                  ) : null}
                  <div className="peaks-to-add mt-2">
                    <ul className="peaks-to-add-list">
                      {selectedPeaks ? selectedPeaks.map((peak, idx) => <li key={idx}>{peak.name}</li>) : null}
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeaksListFilter;
