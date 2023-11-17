import React, { useState } from 'react';
import { Form, FormControl, InputGroup, ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const PeaksListFilter = ({ peaks, setNewCompletedPeaks, handleNewPeaksSubmit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filteredPeaks, setFilteredPeaks] = useState(peaks);
  const [searchText, setSearchText] = useState('');
  const [selectedPeaks, setSelectedPeaks] = useState([]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setFilteredPeaks(peaks);
    }
  };

  const handleInputChange = (value) => {
    setSearchText(value);
    filterPeaks(value);
  };

  const filterPeaks = (value) => {
    const filtered = peaks.filter((peak) =>
      peak.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPeaks(filtered);
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

  const isPeakSelected = (peak) => {
    return selectedPeaks.includes(peak);
  };

  return (
    <div style={{ maxHeight: isExpanded ? '20vh' : '5vh', overflowY: 'scroll' }}>
      <div onClick={toggleExpand} className="addPeaksBar">
        Add Peaks
      </div>
      {isExpanded && (
        <div>
          <SearchBar onInputChange={handleInputChange} />
          <ListGroup>
            {filteredPeaks.map((peak, idx) => (
              <ListGroup.Item
                key={idx}
                onClick={() => handleItemClick(peak)}
                className={isPeakSelected(peak) ? 'selectedListItem' : ''}
              >
                {peak.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button onClick={() => {
            handleNewPeaksSubmit();
            setIsExpanded(false);
          }}>Add Peaks to List</Button>
        </div>
      )}
    </div>
  );
};

const SearchBar = ({ onInputChange }) => {
  const handleInputChange = (e) => {
    const value = e.target.value;
    onInputChange(value);
  };

  return (
    <Form>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search..."
          aria-label="Search"
          aria-describedby="basic-addon2"
          onChange={handleInputChange}
        />
      </InputGroup>
    </Form>
  );
};

export default PeaksListFilter;
