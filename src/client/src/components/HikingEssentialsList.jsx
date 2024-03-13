import { Row, Col } from 'react-bootstrap';
import HikingEssentialsCard from './HikingEssentialsCard';
import {
    FaCompass,
    FaUtensils,
    FaTint,
    FaFirstAid,
    FaTools,
    FaLightbulb,
    FaSun,
    FaFire,
    FaSnowflake,
    FaShoePrints,
  } from 'react-icons/fa';

const HikingEssentialsList = () => {

    const hikingEssentials = [
        { title: "Navigation Tools", description: "Maps, compass, GPS device, or a reliable smartphone app", icon: FaCompass },
        { title: "Nutrition", description: "Extra food for emergencies and energy replenishment", icon: FaUtensils },
        { title: "Water", description: "Sufficient water and a filtration system or purification tablets", icon: FaTint },
        { title: "First Aid Kit", description: "Include essentials for treating minor injuries", icon: FaFirstAid },
        { title: "Repair Kit and Tools", description: "Knife, multi-tool, duct tape, and gear repair supplies", icon: FaTools },
        { title: "Illumination", description: "Headlamp or flashlight with extra batteries", icon: FaLightbulb },
        { title: "Sun Protection", description: "Sunglasses, sunscreen (SPF 30+), and a wide-brimmed hat", icon: FaSun },
        { title: "Fire Starter", description: "Waterproof matches, lighter, or fire starter", icon: FaFire },
        { title: "Insulation", description: "Extra clothing layers suitable for changing weather conditions", icon: FaSnowflake },
        { title: "Appropriate Footwear", description: 'Comfortable and sturdy shoes', icon: FaShoePrints },
      ];

  return (
      <Row>
        {hikingEssentials.map((item, index) => (
          <Col key={index} className="p-0">
            <HikingEssentialsCard {...item} />
          </Col>
        ))}
      </Row>
  );
};

export default HikingEssentialsList;
