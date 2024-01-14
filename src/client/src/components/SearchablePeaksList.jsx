function SearchablePeaksList({ peaksList, isPeakSelected }) {
    return (
      <>
        <SearchBar onInputChange={handleInputChange} />
        <ListGroup className="list-items">
          {peaksList.map((peak, idx) => (
            <ListGroup.Item
              key={idx}
              onClick={() => handleItemClick(peak)}
              className={`peakListItem ${isPeakSelected(peak) ? 'selectedListItem' : ''}`}
            >
              {peak.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </>
    );
  }

export default SearchablePeaksList;