import React, { useState } from 'react';
import { Form, FormControl, InputGroup, Button, ListGroup } from 'react-bootstrap';

const PeakListFilter = ({ peaks, setNewCompletedPeaks }) => {

  const [filteredPeaks, setFilteredPeaks] = useState(peaks);
  const [searchText, setSearchText] = useState("");
  const [selectedPeaks, setSelectedPeaks] = useState([]);

  const handleInputChange = (value) => {
    setSearchText(value);
    filterPeaks(value);
  };

  const filterPeaks = (value) => {
    const filtered = peaks.filter((peak) => peak.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredPeaks(filtered);
  };

  const handleItemClick = (peak) => {

    const isSelected = selectedPeaks.includes(peak);

    if (isSelected) {
      setNewCompletedPeaks(prev => prev.filter(item => item !== peak));
    } else {
      setNewCompletedPeaks(prev => [...prev, peak]);
    }
    setSelectedPeaks(prev => (
      isSelected ? prev.filter(item => item !== peak) : [...prev, peak]
    ));
  };

  const isPeakSelected = (peak) => {
    return selectedPeaks.includes(peak);
  };

  return (
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

export default PeakListFilter;
