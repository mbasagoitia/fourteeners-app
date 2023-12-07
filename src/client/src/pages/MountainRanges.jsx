import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MountainRanges = () => {
    return (
        <Container className="mountain-ranges">
            <Row className="mb-4">
                <Col>
                <h1>Mountain Ranges of Colorado</h1>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={6}>
                <h2>Sawatch Range</h2>
                <p>The Sawatch Range, situated in central Colorado, boasts the highest concentration of fourteeners in the state, including massive peaks like Mount Elbert, Colorado's highest point, and Mount Massive. These soaring peaks offer breathtaking alpine scenery, with sprawling forests, pristine lakes, and meadows dotting the landscape. Wildlife like bighorn sheep, elk, and marmots are commonly spotted here. Accessible from towns like Leadville and Buena Vista, the Sawatch Range provides numerous hiking trails, though weather can be unpredictable due to high elevations.</p>
                </Col>
                <Col md={6}>
                <img src={require("../images/sawatch.jpg")} alt="Sawatch Mountain Range" />
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={{span: 6, order: "last" }}>
                <h2>Sangre de Cristo Range</h2>
                <p>The Sangre de Cristo Range in southern Colorado harbors iconic peaks such as Crestone Needle and Blanca Peak. Known for its dramatic, jagged peaks and deep valleys, this range offers stunning vistas and diverse ecosystems, including alpine tundra and ponderosa forests. Hikers might encounter black bears, mountain lions, and various bird species. Trails in the Sangre de Cristo Range, accessible from towns like Westcliffe and Salida, offer challenging yet rewarding experiences, though weather conditions can change rapidly.</p>
                </Col>
                <Col md={{span: 6, order: "first" }}>
                <img src={require("../images/sangre-de-cristo.jpg")} alt="Sangre De Cristo Mountain Range" />
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={6}>
                <h2>San Juan Mountains</h2>
                <p>The San Juan Mountains in southwestern Colorado feature some of the state's most striking and diverse landscapes, encompassing famous peaks like Mount Sneffels and Wetterhorn Peak. This range boasts rugged terrain, colorful alpine meadows, and dense forests. Hikers can observe diverse wildlife, including mule deer and golden eagles. Towns like Ouray and Telluride serve as gateways to the extensive trail network, offering a mix of easy to strenuous hikes amidst varying weather conditions.</p>
                </Col>
                <Col md={6}>
                <img src={require("../images/san-juan.jpg")} alt="San Juan Mountain Range" />
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={{span: 6, order: "last" }}>
                <h2>Mosquito Range</h2>
                <p>The Mosquito Range, flanked by Leadville and Fairplay, showcases lesser-known but captivating peaks, such as Mount Lincoln and Mount Sherman. This range offers scenic alpine environments with gentle slopes and broad valleys. Wildlife like mountain goats and ptarmigans inhabit these areas. Hiking trails vary in difficulty, providing opportunities for both novice and experienced hikers, although weather conditions can be harsh due to the high altitude.</p>
                </Col>
                <Col md={{span: 6, order: "first" }}>
                <img src={require("../images/mosquito.jpg")} alt="Mosquito Mountain Range" />
                </Col>
            </Row>
            <Row className="mb-4"> 
                <Col md={6}>
                <h2>Front Range</h2>
                <p>The Front Range, closest to Denver and Boulder, hosts iconic peaks such as Longs Peak and Pikes Peak. This range offers a mix of easily accessible trails and challenging routes, surrounded by diverse landscapes including forests and alpine lakes. Wildlife like elk and bighorn sheep inhabit these areas, and hikers can encounter rapidly changing weather conditions, especially at higher elevations.</p>
                </Col>
                <Col md={6}>
                <img src={require("../images/front.jpg")} alt="Front Mountain Range" />
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={{span: 6, order: "last" }}>
                <h2>Elk Mountains</h2>
                <p>The Elk Mountains, near Aspen and Crested Butte, feature renowned peaks like Capitol Peak and Maroon Bells. Characterized by towering peaks, pristine alpine lakes, and aspen groves, this range is a paradise for hikers and photographers. Wildlife such as black bears and lynx roam the area. Trails here cater to varying skill levels, but weather conditions can be unpredictable due to the high elevations.</p>
                </Col>
                <Col md={{span: 6, order: "first" }}>
                <img src={require("../images/elk.jpg")} alt="Elk Mountain Range" />
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={6}>
                <h2>Tenmile Range</h2>
                <p>The Tenmile Range, close to Breckenridge, showcases peaks like Quandary Peak and Peak 1. Known for its accessibility from nearby towns and resorts, this range offers a mix of moderately challenging hikes and more strenuous routes. The terrain includes alpine meadows and pine forests, hosting wildlife like marmots and mountain goats. Hikers should be prepared for changing weather conditions and steep ascents.</p>
                </Col>
                <Col md={6}>
                <img src={require("../images/tenmile.jpg")} alt="Tenmile Mountain Range" />
                </Col>
            </Row>
        </Container>
    )
}

export default MountainRanges;