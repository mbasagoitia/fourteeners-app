import { useState } from 'react';
import { Form, InputGroup, FormControl, ListGroup } from 'react-bootstrap';

const SearchablePeaksList = ({ items, onItemClick, isItemSelected }) => {
  const [filteredItems, setFilteredItems] = useState(items);
  const [searchText, setSearchText] = useState('');

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
    <>
      <div className="search-bar">
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search..."
            aria-label="Search"
            aria-describedby="basic-addon2"
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </InputGroup>
      </div>
      <ListGroup className="list-items">
        {filteredItems.map((item, idx) => (
          <ListGroup.Item
            key={idx}
            onClick={() => onItemClick(item)}
            className={`listItem${isItemSelected(item) ? 'selectedListItem' : ''}`}
          >
            {item.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default SearchablePeaksList;

