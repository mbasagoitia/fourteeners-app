import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CompletedPeaksList({ peaks }) {
    return (
      <>
        {peaks.map((peak, idx) => (
          <Card style={{ width: "18rem" }} key={idx}>
            <Card.Img variant="top" src={peak.img} />
            <Card.Body>
              <Card.Title>{peak.name}</Card.Title>
              <Card.Text>{peak.elevation}</Card.Text>
              <Card.Text>{peak.range}</Card.Text>
              <Card.Text>{peak.date_completed}</Card.Text>
              <Button variant="primary">Read More</Button>
            </Card.Body>
          </Card>
        ))}
      </>
    );
  }

export default CompletedPeaksList;