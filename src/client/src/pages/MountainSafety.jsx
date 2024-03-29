import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HikingEssentialsList from '../components/HikingEssentialsList';

function MountainSafety () {

    useEffect(() => {
        const scrollToSection = () => {
            const hash = window.location.hash.substring(1);
            const sectionElement = document.getElementById(hash);
            if (sectionElement) {
                const container = document.querySelector('.safety-guide');
                const offset = sectionElement.offsetTop - container.offsetTop;
                container.scrollTo({ top: offset, behavior: 'smooth' });
            }
        };
    
        scrollToSection();
    }, []);

    const handleLinkClick = (e, id) => {
        e.preventDefault();
        const sectionElement = document.getElementById(id);
        if (sectionElement) {
            const container = document.querySelector('.safety-guide');
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
                        <ul>
                            <li><a href="#hiking-essentials" onClick={(e) => handleLinkClick(e, "hiking-essentials")}>Ten Hiking Essentials</a></li>
                            <li><a href="#weather-conditions" onClick={(e) => handleLinkClick(e, "weather-conditions")}>Weather Conditions</a></li>
                            <li><a href="#training" onClick={(e) => handleLinkClick(e, "training")}>Training</a></li>
                            <li><a href="#safety-tips" onClick={(e) => handleLinkClick(e, "safety-tips")}>Additional Safety Tips</a></li>
                            <li><a href="#resources" onClick={(e) => handleLinkClick(e, "resources")}>Additional Resources</a></li>
                            <li><a href="#disclaimer" onClick={(e) => handleLinkClick(e, "disclaimer")}>Safety Disclaimer</a></li>
                        </ul>
                    </div>
                </div>
            </Col>
            <Col md={9} className="info-guide-container">
                <div className="form-overlay-box safety-guide">
                    <Row className="mb-4">
                        <Col>
                            <h1>Mountain Safety</h1>
                            <p className="mt-4">Hiking Colorado's fourteeners offers breathtaking views and thrilling adventures. However, these peaks pose unique challenges and risks. Prioritize safety with thorough preparation, knowledge, and adherence to best practices. Bring the following items with you on <em>every</em> hiking trip.</p>
                        </Col>
                    </Row>
                    <Row className="mb-4" id="hiking-essentials">
                        <Col>
                            <h2 className="mb-4"><strong>Ten Hiking Essentials</strong></h2>
                            <HikingEssentialsList />
                        </Col>
                    </Row>
                    <Row id="weather-conditions">
                        <Col>
                            <h2><strong>Weather Conditions</strong></h2>
                            <ul>
                                <li><strong>Summer:</strong> Be prepared for sudden thunderstorms, usually in the afternoon. Start early to avoid afternoon weather hazards.</li>
                                <li><strong>Winter:</strong> Extreme cold, deep snow, and avalanche risk. Specialized gear, training, and knowledge are essential.</li>
                                <li><strong>Shoulder Seasons (Spring/Fall):</strong> Unpredictable weather. Expect rapid changes in temperature, snow, and high winds.</li>
                            </ul>
                        </Col>
                    </Row>
                    <Row className="mb-4" id="training">
                        <Col>
                            <h2><strong>Training</strong></h2>
                            <ul>
                                <li><strong>Physical Fitness:</strong> Improve cardiovascular endurance and leg strength. Gradually increase hiking distances and elevation gain to prepare for the demands of higher peaks.</li>
                                <li><strong>Altitude Acclimatization:</strong> Gradually ascend, take frequent breaks, and hydrate well. Acclimate to higher elevations before attempting strenuous hikes.</li>
                                <li><strong>Skill Building:</strong> Gain experience in navigation, recognizing weather patterns, and emergency procedures. Consider taking wilderness first aid courses.</li>
                            </ul>
                    </Col>
                    </Row>
                    <Row id="safety-tips">
                        <Col>
                            <h2><strong>Additional Safety Tips</strong></h2>
                            <ul>
                                <li><strong>Know Your Limits:</strong> Respect your fitness, experience, and the mountain's challenges.</li>
                                <li><strong>Leave No Trace:</strong> Minimize impact by carrying out all trash and waste.</li>
                                <li><strong>Tell Someone:</strong> Share your hiking plan with someone reliable. Check in upon completion.</li>
                                <li><strong>Stay Informed:</strong> Monitor weather forecasts and trail conditions.</li>
                                <li><strong>Gear Check:</strong> Ensure equipment reliability and suitability for the terrain and weather.</li>
                            </ul>
                        </Col>
                    </Row>
                    <Row id="resources">
                        <Col>
                        <h2><strong>Additional Resources</strong></h2>
                        <ul>
                            <li><strong><a href="https://www.14ers.com/" target="_blank" rel="noreferrer">14ers.com:</a></strong> This website offers detailed route descriptions, trip reports, and forums discussing Colorado's fourteeners. It provides valuable information on trail conditions, route variations, and user experiences.</li>
                            <li><strong><a href="https://www.weather.gov/bou/" target="_blank" rel="noreferrer">National Weather Service (NWS) - Colorado:</a></strong> The NWS provides detailed weather forecasts and alerts specific to Colorado's mountain regions, crucial for planning hiking trips and staying updated on changing weather conditions.</li>
                            <li><strong><a href="https://www.alltrails.com/" target="_blank" rel="noreferrer">AllTrails:</a></strong> AllTrails is a popular platform offering a wide range of hiking trail information, including user reviews, trail maps, difficulty levels, and photos. It covers various hiking trails worldwide, including those leading to Colorado's fourteeners.</li>
                            <li><strong><a href="https://trails.colorado.gov/" target="_blank" rel="noreferrer">Colorado Trail Explorer (COTREX):</a></strong> COTREX is an interactive trail map resource providing detailed information on trails across Colorado, including those leading to the state's fourteeners. It offers trail conditions, difficulty ratings, and downloadable maps.</li>
                            <li><strong><a href="https://www.mountain-forecast.com/" target="_blank" rel="noreferrer">Mountain Forecast:</a></strong> Mountain Forecast specializes in weather forecasts for mountainous regions. It offers detailed weather predictions specifically tailored for higher elevations, including Colorado's fourteeners.</li>
                        </ul>
                        </Col>
                    </Row>
                    <Row id="disclaimer">
                        <Col>
                            <h2><strong>Disclaimer</strong></h2>
                            <p>The information provided on this website is intended as a guide to hiking trails and outdoor activities. It does not assume responsibility for the decisions made by hikers or outdoor enthusiasts. While we aim to offer accurate and helpful information, we cannot guarantee the accuracy, completeness, or suitability of the content for individual circumstances.</p>
                            <p>Each person accessing this information is responsible for their own safety and well-being. Hiking, especially in mountainous regions such as Colorado's fourteeners, carries inherent risks that can be influenced by changing weather conditions, personal fitness levels, equipment, and other variables beyond our control.</p>
                            <p>The recommendations and trail information presented here are intended as suggestions for hikes that users may find enjoyable. It is essential for individuals to assess their own capabilities, experience, and preparedness before embarking on any outdoor activity. Knowing personal limits, understanding the risks involved, and making informed decisions are crucial for a safe and enjoyable outdoor experience.</p>
                            <p>By using this website, you acknowledge that the provided information is not a substitute for personal judgment or professional guidance. We strongly encourage users to conduct their own research, gather updated information, and exercise caution when planning and executing outdoor adventures.</p>
                            <p>Remember, each individual is accountable for their choices and actions while engaging in outdoor activities.</p>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    </Container>
    )
}

export default MountainSafety;