import { Card } from 'react-bootstrap';
import Icon from './Icon';

const HikingEssentialsCard = ({ title, description, icon }) => {
  return (
    <Card className="hiking-essentials-card">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Icon icon={icon} size={30} color="#d48106" />
      </Card.Body>
    </Card>
  );
};

export default HikingEssentialsCard;
