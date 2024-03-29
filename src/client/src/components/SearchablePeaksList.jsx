import { useState } from 'react';
import { InputGroup, FormControl, ListGroup } from 'react-bootstrap';

const SearchablePeaksList = ({ items, onItemClick, isItemSelected }) => {
  const [filteredItems, setFilteredItems] = useState(items);
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (value) => {
    setSearchText(value);
    filterItems(value);
  };

  const filterItems = (value) => {
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <div className="searchablePeakslist">
      <div className="search-bar">
        <InputGroup>
          <FormControl
            placeholder="Search..."
            aria-label="Search"
            aria-describedby="searchBar"
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </InputGroup>
      </div>
      <div className="peaks-list-wrapper">
        <ListGroup className="list-items">
          {filteredItems.map((item, idx) => (
            <ListGroup.Item
              key={idx}
              onClick={() => onItemClick(item)}
              className={`listItem ${isItemSelected(item) ? 'selectedListItem' : ''}`}
            >
              {item.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default SearchablePeaksList;

