import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MountainClassificationGuide () {
    return (
        <Container>
            <h1>Mountain Classes and Exposure on Colorado's Fourteeners</h1>
            <h2>Mountain Classes:</h2>
            <p>In mountaineering, mountains are classified based on difficulty, technicality, and level of challenge. The Yosemite Decimal System (YDS) is commonly used in the United States to categorize climbs into classes ranging from 1 to 5.</p>
            <h3>Class 1: Easy Hiking</h3>
            <p><i>Characteristics:</i> Class 1 terrain involves straightforward hiking on well-defined trails or paths. These trails are typically well-marked and suitable for beginners. Minimal elevation gain and non-exposed terrain are typical.
                <i>Techniques:</i> Basic hiking skills are sufficient.
                <i>Equipment:</i> Sturdy hiking boots, weather-appropriate clothing, water, and navigation tools.</p>
            <h3>Class 2: Moderate Scrambling</h3>
            <p><i>Characteristics:</i> Class 2 involves off-trail hiking, with some sections requiring hands-on scrambling over rougher terrain, rocks, or talus fields. The route might be less defined, requiring minor route finding.
                <i>Techniques:</i> Basic scrambling skills, using hands for balance and navigating uneven terrain.
                <i>Equipment:</i> Hiking poles, durable footwear with good traction, helmet for loose rock protection, and navigation tools.</p>
            <h3>Class 3: Climbing with Moderate Exposure</h3>
            <p><i>Characteristics:</i> Class 3 involves steeper, more exposed terrain that may require climbing, using hands and feet for upward movement. Exposure to significant drops might be present. Route finding is necessary.
                <i>Techniques:</i> Basic climbing skills, route finding, and using hands for climbing.
                <i>Equipment:</i> Climbing helmet, grippy shoes or approach shoes, climbing gloves, and possibly a rope for protection.</p>
            <h3>Class 4: Steep Climbing with Exposure</h3>
            <p><i>Characteristics:</i> Class 4 involves steeper, more challenging terrain with increased exposure and more technical climbing sections. Confidence in climbing and exposure is crucial.
                <i>Techniques:</i> Solid climbing skills, understanding roped climbing techniques, and managing significant exposure.
                <i>Equipment:</i> Climbing harness, rope, climbing protection (cams, nuts), helmet, proper climbing shoes, and anchoring gear.</p>
            <h3>Class 5: Technical Climbing</h3>
            <p><i>Characteristics:</i> Class 5 encompasses highly technical and difficult climbing routes, often requiring specialized gear and protection (cams, nuts, etc.). These routes demand advanced climbing skills and experience.
                <i>Techniques:</i> Advanced climbing techniques including belaying, leading, and using specialized gear.
                <i>Equipment:</i> Full climbing gear including ropes, protection, harness, helmet, climbing shoes, and extensive experience.</p>
            <h2>Exposure:</h2>
            <p>Exposure refers to the perceived or real risk of falling and the consequences of a fall. It's often associated with cliffs, narrow ledges, or steep slopes. Different levels of exposure can be encountered within various mountain classes:</p>
            <ul>
                <li>Low Exposure: Minimal risk of falling with straightforward terrain. Class 1 and some Class 2 routes may have low exposure.</li>
                <li>Moderate Exposure: Increased risk of falling but manageable. Class 3 and some Class 4 routes might have moderate exposure.</li>
                <li>High Exposure: Significant risk of falling with severe consequences. Class 4 and Class 5 routes often have high exposure, involving cliffs, narrow ridges, and steep drop-offs.</li>
            <p>For example, the Kelso Ridge route on Torreys Peak (Class 3) in Colorado has moderate exposure, with sections requiring careful climbing along a narrow ridge. The Capitol Peak Knife Edge (Class 4) presents high exposure, a narrow and steep ridge with significant consequences if fallen.</p>
            <p>Understanding mountain classes and exposure levels is crucial for hikers to assess their abilities, select appropriate routes, and use the necessary equipment and techniques for a safe and enjoyable mountain experience.</p>
            </ul>
        </Container>
    )
}

export default MountainClassificationGuide;