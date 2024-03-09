import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MountainClassificationGuide () {
    return (
        <Container fluid>
        <Row className="ss-row">
            <Col md={3} className="sidebar">
                <div className="form-overlay-box">
                    <div className="guide-sidebar-container">
                        <p>Jump to Section</p>
                        <ol>
                            <li><a href="#class">Class</a></li>
                                <ul>
                                    <li><a href="#class1">Class 1</a></li>
                                    <li><a href="#class2">Class 2</a></li>
                                    <li><a href="#class3">Class 3</a></li>
                                    <li><a href="#class4">Class 4</a></li>
                                </ul>
                            <li><a href="#exposure">Exposure</a></li>
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
                        <p className="text-center">In mountaineering, mountains are classified based on difficulty, technicality, and level of challenge. The Yosemite Decimal System (YDS) is commonly used in the United States to categorize climbs into classes ranging from 1 to 5.</p>      
                    </Col>
                </Row>
                <Row className="my-4"><h3 className="text-center" id="class1">Class 1: Easy Hiking</h3></Row>
                <Row>
                    <Col md={6}>
                        <p>Class 1 terrain involves straightforward hiking on well-defined trails or paths. These trails are typically well-marked and suitable for beginners. Minimal elevation gain and non-exposed terrain are typical.</p>
                    </Col>
                    <Col md={6}>
                        <ul>
                            <li className="mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#d48106" viewBox="0 0 16 16">
                            <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
                            <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/>
                            </svg> Techniques: Basic hiking skills are sufficient.</li>
                            <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#d48106" viewBox="0 0 16 16">
                            <path d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5 5 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334"/>
                            </svg> Equipment: Sturdy hiking boots, weather-appropriate clothing, water, and navigation tools.</li>
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
                            <li className="mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#d48106" viewBox="0 0 16 16">
                            <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
                            <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/>
                            </svg> Techniques: Basic scrambling skills, using hands for balance and navigating uneven terrain.</li>
                            <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#d48106" viewBox="0 0 16 16">
                            <path d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5 5 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334"/>
                            </svg> Equipment: Hiking poles, durable footwear with good traction, helmet for loose rock protection, and navigation tools.</li>
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
                            <li className="mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#d48106" viewBox="0 0 16 16">
                            <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
                            <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/>
                            </svg> Techniques: Basic climbing skills, route finding, and using hands for climbing.</li>
                            <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#d48106" viewBox="0 0 16 16">
                            <path d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5 5 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334"/>
                            </svg> Equipment: Climbing helmet, grippy shoes or approach shoes, climbing gloves, and possibly a rope for protection.</li>
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
                            <li className="mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#d48106" viewBox="0 0 16 16">
                            <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
                            <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/>
                            </svg> Techniques: Solid climbing skills, understanding roped climbing techniques, and managing significant exposure.</li>
                            <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#d48106" viewBox="0 0 16 16">
                            <path d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5 5 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334"/>
                            </svg> Equipment: Climbing harness, rope, climbing protection (cams, nuts), helmet, proper climbing shoes, and anchoring gear.</li>
                        </ul>
                    </Col>
                </Row>
                <Row className="my-4" id="exposure">
                    <Col>
                        <h2>Exposure</h2>
                        <p className="text-center">Exposure refers to the perceived or real risk of falling and the consequences of a fall. It's often associated with cliffs, narrow ledges, or steep slopes. Different levels of exposure can be encountered within various mountain classes:</p>
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