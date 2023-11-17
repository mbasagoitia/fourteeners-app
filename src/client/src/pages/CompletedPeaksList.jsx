import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CompletedPeaksList({ peaks }) {
    return (
      <div className="completed-peaks-container">
        {peaks.map((peak, idx) => (
          <Card style={{ width: "18rem" }} key={idx}>
            <Card.Img variant="top" src={peak.img} />
            <Card.Body>
              <Card.Title>{peak.name}</Card.Title>
              <Card.Text>{peak.elevation.toLocaleString()} ft.</Card.Text>
              <Card.Text>{peak.range} Range</Card.Text>
              <Card.Text>{peak.date_completed}</Card.Text>
              <Button variant="primary">Read More</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }

export default CompletedPeaksList;