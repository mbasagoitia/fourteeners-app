import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CompletedPeaksList({ peaks, editMode }) {
    return (
      <div className="completed-peaks-container mt-4">
        {peaks.map((peak, idx) => (
          <Card style={{ width: "18rem" }} key={idx}>
            <Card.Img variant="top" src={peak.img} />
            <Card.Body>
              <Card.Title>{peak.name}</Card.Title>
              <Card.Text>{peak.elevation.toLocaleString()} ft.</Card.Text>
              <Card.Text>{peak.range} Range</Card.Text>
              <Card.Text>{peak.date_completed}</Card.Text>
              {editMode ? <Button className="delete-peak-btn">Delete</Button> : <Button variant="primary">View Details</Button>}
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }

export default CompletedPeaksList;