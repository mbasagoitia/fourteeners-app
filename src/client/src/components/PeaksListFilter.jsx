import React, { useState } from 'react';
import { Form, FormControl, InputGroup, ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const PeaksListFilter = ({ editMode, setEditMode, peaks, setNewCompletedPeaks, handleNewPeaksSubmit }) => {
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

  return editMode ? (
    <div style={{ maxHeight: isExpanded ? '25vh' : '5vh', overflowY: 'scroll' }}>
      <div className="addPeaksBar">
        <span onClick={toggleExpand}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mb-1 mx-1" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
          Add Peaks
        </span>
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
  ) : <Button onClick={() => setEditMode(true)}>Edit</Button>;  
};

const SearchBar = ({ onInputChange }) => {
  const handleInputChange = (e) => {
    const value = e.target.value;
    onInputChange(value);
  };

  return (
    <Form className="search-bar">
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
