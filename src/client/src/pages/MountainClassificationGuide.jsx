import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaCompass, FaHammer } from 'react-icons/fa';

function MountainClassificationGuide () {

    const handleLinkClick = (e, id) => {
        e.preventDefault();
        const sectionElement = document.getElementById(id);
        if (sectionElement) {
            const container = document.querySelector('.info-guide');
            const offset = sectionElement.offsetTop - container.offsetTop;
            container.scrollTo({ top: offset, behavior: 'smooth' });
        }
    };    

    return (
        <Container fluid>
        <Row className="ss-row">
            <Col md={3} className="sidebar d-none d-md-block">
                <div className="form-overlay-box">
                    <div className="guide-sidebar-container">
                        <p>Jump to Section</p>
                        <ol>
                            <li><a href="#class" onClick={(e) => handleLinkClick(e, "class")}>Class</a></li>
                                <ul>
                                    <li><a href="#class1" onClick={(e) => handleLinkClick(e, "class1")}>Class 1</a></li>
                                    <li><a href="#class2" onClick={(e) => handleLinkClick(e, "class2")}>Class 2</a></li>
                                    <li><a href="#class3" onClick={(e) => handleLinkClick(e, "class3")}>Class 3</a></li>
                                    <li><a href="#class4" onClick={(e) => handleLinkClick(e, "class4")}>Class 4</a></li>
                                </ul>
                            <li><a href="#exposure" onClick={(e) => handleLinkClick(e, "exposure")}>Exposure</a></li>
                        </ol>
                    </div>
                </div>
            </Col>
            <Col md={9} className="info-guide-container">
                <div className="form-overlay-box info-guide">
                <Row>
                    <Col>
                        <h1 className="text-center">Mountain Classes and Exposure</h1>
                    </Col>
                </Row>
                <Row className="my-4" id="class">
                    <Col>
                        <h2>Class</h2> 
                        <p>In mountaineering, mountains are classified based on difficulty, technicality, and level of challenge. The Yosemite Decimal System (YDS) is commonly used in the United States to categorize climbs into classes ranging from 1 to 5.</p>      
                    </Col>
                </Row>
                <Row className="my-4"><h3 className="text-center" id="class1">Class 1: Easy Hiking</h3></Row>
                <Row>
                    <Col md={6}>
                        <p>Class 1 terrain involves straightforward hiking on well-defined trails or paths. These trails are typically well-marked and suitable for beginners. Minimal elevation gain and non-exposed terrain are typical.</p>
                    </Col>
                    <Col md={6}>
                        <ul>
                            <li className="mb-2">
                                <FaCompass size={20} color="#d48106" /> 
                                Techniques: Basic hiking skills are sufficient.
                            </li>
                            <li>
                                <FaHammer size={20} color="#d48106" /> 
                                Equipment: Sturdy hiking boots, weather-appropriate clothing, water, and navigation tools.
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Row className="my-4" id="class2"><h3 className="text-center">Class 2: Moderate Scrambling</h3></Row>
                <Row>
                    <Col md={6}>
                        <p>Class 2 involves off-trail hiking, with some sections requiring hands-on scrambling over rougher terrain, rocks, or talus fields. The route might be less defined, requiring minor route finding.</p>    
                    </Col>
                    <Col md={6}>   
                        <ul> 
                            <li className="mb-2">
                                <FaCompass size={20} color="#d48106" /> 
                                Techniques: Basic scrambling skills, using hands for balance and navigating uneven terrain.
                            </li>
                            <li>
                                <FaHammer size={20} color="#d48106" />
                                Equipment: Hiking poles, durable footwear with good traction, helmet for loose rock protection, and navigation tools.
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Row className="my-4" id="class3"><h3 className="text-center">Class 3: Climbing with Moderate Exposure</h3></Row>
                <Row className="mt-4">
                    <Col md={6}>
                        <p>Class 3 involves steeper, more exposed terrain that may require climbing, using hands and feet for upward movement. Exposure to significant drops might be present. Route finding is necessary.</p>
                    </Col>
                    <Col md={6}>
                        <ul>  
                            <li className="mb-2">
                                <FaCompass size={20} color="#d48106" /> 
                                Techniques: Basic climbing skills, route finding, and using hands for climbing.
                            </li>
                            <li>
                                <FaHammer size={20} color="#d48106" />  
                                Equipment: Climbing helmet, grippy shoes or approach shoes, climbing gloves, and possibly a rope for protection.
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Row className="my-4" id="class4"><h3 className="text-center">Class 4: Steep Climbing with Exposure</h3></Row>
                <Row>
                    <Col md={6}>
                        <p>Class 4 involves steeper, more challenging terrain with increased exposure and more technical climbing sections. Confidence in climbing and exposure is crucial.</p>
                    </Col>
                    <Col md={6}>
                        <ul>
                            <li className="mb-2">
                                <FaCompass size={20} color="#d48106" /> 
                                Techniques: Solid climbing skills, understanding roped climbing techniques, and managing significant exposure.
                            </li>
                            <li><FaHammer size={20} color="#d48106" /> 
                            Equipment: Climbing harness, rope, climbing protection (cams, nuts), helmet, proper climbing shoes, and anchoring gear.
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Row className="my-4" id="exposure">
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
                </div>
            </Col>
        </Row>
    </Container>
    )
}

export default MountainClassificationGuide;