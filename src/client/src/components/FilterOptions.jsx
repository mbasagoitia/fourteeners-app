import { Form, Navbar, Nav } from 'react-bootstrap';

function FilterOptions({ selectedFilter, handleRadioChange, currentPeak, preferredRange }) {
    return (
        <>
        <Navbar expand="md" className="filter-options mt-3 navbar-dark">
        <span className="white-text">Filter by:</span>
        <Navbar.Toggle aria-controls="filter-options-navbar" />
        <Navbar.Collapse id="filter-options-navbar">
          <Nav className="mr-auto">
            <fieldset>
            <Form.Check
            type="radio"
            id="filter-radio-0"
            label="Relevance"
            name="filterRadioGroup"
            value="relevance"
            checked={selectedFilter === "relevance"}
            onChange={handleRadioChange}
            />
            <Form.Check
            type="radio"
            id="filter-radio-1"
            label="Length"
            name="filterRadioGroup"
            value="length"
            checked={selectedFilter === "length"}
            onChange={handleRadioChange}
            />
            {currentPeak.distanceFromUser ? (
            <Form.Check
            type="radio"
            id="filter-radio-2"
            label="Distance"
            name="filterRadioGroup"
            value="distance"
            checked={selectedFilter === "distance"}
            onChange={handleRadioChange}
            />
            ) : null}
            <Form.Check
            type="radio"
            id="filter-radio-3"
            label="Difficulty (low to high)"
            name="filterRadioGroup"
            value="difficulty"
            checked={selectedFilter === "difficulty"}
            onChange={handleRadioChange}
            />
            {preferredRange ? (
            <Form.Check
            type="radio"
            id="filter-radio-4"
            label="Preferred Range"
            name="filterRadioGroup"
            value="range"
            checked={selectedFilter === "range"}
            onChange={handleRadioChange}
            />
            ) : null}
            <Form.Check
            type="radio"
            id="filter-radio-5"
            label="Traffic Level (low to high)"
            name="filterRadioGroup"
            value="traffic"
            checked={selectedFilter === "traffic"}
            onChange={handleRadioChange}
            />
            </fieldset>
            </Nav>
      </Navbar.Collapse>
    </Navbar>
    </>
    )
}

export default FilterOptions;