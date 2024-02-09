import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MountainClassificationGuide () {
    return (
        <div className="content-container">
            <Container>
                <div className="overlay-container">
                    <div className="fullsize-overlay-box">
                        <Row>
                            <Col>
                                <h1>Mountain Classes and Exposure on Colorado's Fourteeners</h1>
                            </Col>
                        </Row>
                        <Row className="my-4">
                            <Col>
                                <h2>Class</h2> 
                                <p>In mountaineering, mountains are classified based on difficulty, technicality, and level of challenge. The Yosemite Decimal System (YDS) is commonly used in the United States to categorize climbs into classes ranging from 1 to 5.</p>      
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <h3>Class 1: Easy Hiking</h3>
                                <p>
                                    <i>Characteristics:</i> Class 1 terrain involves straightforward hiking on well-defined trails or paths. These trails are typically well-marked and suitable for beginners. Minimal elevation gain and non-exposed terrain are typical.
                                </p>
                                <p>
                                    <i>Techniques:</i> Basic hiking skills are sufficient.
                                </p>
                                <p><i>Equipment:</i> Sturdy hiking boots, weather-appropriate clothing, water, and navigation tools.</p>
                            </Col>
                            <Col md={6}>
                                <h3>Class 2: Moderate Scrambling</h3>
                                <p>
                                    <i>Characteristics:</i> Class 2 involves off-trail hiking, with some sections requiring hands-on scrambling over rougher terrain, rocks, or talus fields. The route might be less defined, requiring minor route finding.
                                </p>    
                                <p>
                                    <i>Techniques:</i> Basic scrambling skills, using hands for balance and navigating uneven terrain.
                                </p>
                                <p>
                                    <i>Equipment:</i> Hiking poles, durable footwear with good traction, helmet for loose rock protection, and navigation tools.
                                </p>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col md={6}>
                                <h3>Class 3: Climbing with Moderate Exposure</h3>
                                <p>
                                    <i>Characteristics:</i> Class 3 involves steeper, more exposed terrain that may require climbing, using hands and feet for upward movement. Exposure to significant drops might be present. Route finding is necessary.
                                </p>
                                <p>  
                                    <i>Techniques:</i> Basic climbing skills, route finding, and using hands for climbing.
                                </p>
                                <p>
                                    <i>Equipment:</i> Climbing helmet, grippy shoes or approach shoes, climbing gloves, and possibly a rope for protection.
                                </p>
                            </Col>
                            <Col md={6}>
                                <h3>Class 4: Steep Climbing with Exposure</h3>
                                <p>
                                    <i>Characteristics:</i> Class 4 involves steeper, more challenging terrain with increased exposure and more technical climbing sections. Confidence in climbing and exposure is crucial.
                                </p>
                                <p>
                                    <i>Techniques:</i> Solid climbing skills, understanding roped climbing techniques, and managing significant exposure.
                                </p>
                                <p>
                                    <i>Equipment:</i> Climbing harness, rope, climbing protection (cams, nuts), helmet, proper climbing shoes, and anchoring gear.
                                </p>
                            </Col>
                        </Row>
                        <Row className="my-4">
                            <Col>
                                <h2>Exposure</h2>
                                <p>Exposure refers to the perceived or real risk of falling and the consequences of a fall. It's often associated with cliffs, narrow ledges, or steep slopes. Different levels of exposure can be encountered within various mountain classes:</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <ul>
                                    <li className="mb-2">Low Exposure: Minimal risk of falling with straightforward terrain. Class 1 and some Class 2 routes may have low exposure.</li>
                                    <li className="mb-2">Moderate Exposure: Increased risk of falling but manageable. Class 3 and some Class 4 routes might have moderate exposure.</li>
                                    <li>High Exposure: Significant risk of falling with severe consequences. Class 4 and Class 5 routes often have high exposure, involving cliffs, narrow ridges, and steep drop-offs.</li>
                                </ul>
                            </Col>
                            <Col>
                                <p>For example, the Kelso Ridge route on Torreys Peak (Class 3) in Colorado has moderate exposure, with sections requiring careful climbing along a narrow ridge. The Capitol Peak Knife Edge (Class 4) presents high exposure, a narrow and steep ridge with significant consequences if fallen.</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mt-2">
                                <p>Understanding mountain classes and exposure levels is crucial for hikers to assess their abilities, select appropriate routes, and use the necessary equipment and techniques for a safe and enjoyable mountain experience.</p>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default MountainClassificationGuide;