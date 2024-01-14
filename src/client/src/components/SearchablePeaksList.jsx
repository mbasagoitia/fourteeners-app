import React from 'react';
import { ListGroup } from 'react-bootstrap';

const SearchablePeaksList = ({ items, onItemClick, isItemSelected }) => {
  return (
    <ListGroup className="list-items">
      {items.map((item, idx) => (
        <ListGroup.Item
          key={idx}
          onClick={() => onItemClick(item)}
          className={`peakListItem ${isItemSelected(item) ? 'selectedListItem' : ''}`}
        >
          {item.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default SearchablePeaksList;
