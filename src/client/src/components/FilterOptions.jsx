import { useState } from 'react';
import { Form, Navbar, Nav } from 'react-bootstrap';

function FilterOptions({ selectedFilter, handleRadioChange, currentPeak, preferredRange }) {

  const [navOpen, setNavOpen] = useState(false);

  const handleOptionSelect = () => {
      setNavOpen(false);
    };
  
    const handleNavToggle = () => {
      setNavOpen(!navOpen);
    }
  
    return (
        <>
        <Navbar expand="sm" expanded={navOpen} className="filter-options mt-3 navbar-dark">
        <span className="white-text filter-text">Filter by:</span>
        <Navbar.Toggle onClick={handleNavToggle} aria-controls="filter-options-navbar" />
        <Navbar.Collapse id="filter-options-navbar">
          <Nav id="filter-options-nav">
            <fieldset id="filter-options-fieldset">
            <Form.Check
            type="radio"
            id="filter-radio-0"
            label="Relevance"
            name="filterRadioGroup"
            value="relevance"
            checked={selectedFilter === "relevance"}
            onChange={(e) => {
              handleRadioChange(e);
              handleOptionSelect();
            }}
            />
            <Form.Check
            type="radio"
            id="filter-radio-1"
            label="Length"
            name="filterRadioGroup"
            value="length"
            checked={selectedFilter === "length"}
            onChange={(e) => {
              handleRadioChange(e);
              handleOptionSelect();
            }}
            />
            {currentPeak.distanceFromUser ? (
            <Form.Check
            type="radio"
            id="filter-radio-2"
            label="Distance"
            name="filterRadioGroup"
            value="distance"
            checked={selectedFilter === "distance"}
            onChange={(e) => {
              handleRadioChange(e);
              handleOptionSelect();
            }}
            />
            ) : null}
            <Form.Check
            type="radio"
            id="filter-radio-3"
            label="Difficulty (low to high)"
            name="filterRadioGroup"
            value="difficulty"
            checked={selectedFilter === "difficulty"}
            onChange={(e) => {
              handleRadioChange(e);
              handleOptionSelect();
            }}
            />
            {preferredRange ? (
            <Form.Check
            type="radio"
            id="filter-radio-4"
            label="Preferred Range"
            name="filterRadioGroup"
            value="range"
            checked={selectedFilter === "range"}
            onChange={(e) => {
              handleRadioChange(e);
              handleOptionSelect();
            }}
            />
            ) : null}
            <Form.Check
            type="radio"
            id="filter-radio-5"
            label="Traffic Level (low to high)"
            name="filterRadioGroup"
            value="traffic"
            checked={selectedFilter === "traffic"}
            onChange={(e) => {
              handleRadioChange(e);
              handleOptionSelect();
            }}
            />
            </fieldset>
            </Nav>
      </Navbar.Collapse>
    </Navbar>
    </>
    )
}

export default FilterOptions;