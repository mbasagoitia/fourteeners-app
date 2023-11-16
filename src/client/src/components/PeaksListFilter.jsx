import React, { useState } from 'react';
import { Form, FormControl, InputGroup, Button, ListGroup } from 'react-bootstrap';

const PeakListFilter = ({ peaks }) => {

  const peakNames = peaks.map((peak) => peak.name);
  const [filteredPeaks, setFilteredPeaks] = useState(peakNames);
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (value) => {
    setSearchText(value);
    filterPeaks(value);
  };

  const filterPeaks = (value) => {
    const filtered = peakNames.filter((peak) =>
      peak.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPeaks(filtered);
  };

  return (
    <div>
      <SearchBar onInputChange={handleInputChange} />
      <ListGroup>
        {filteredPeaks.map((peak, idx) => (
          <ListGroup.Item key={idx}>{peak}</ListGroup.Item>
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
