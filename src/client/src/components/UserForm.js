import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function UserForm () {
    return (
    <Form>
        <div>Select your current location (expand on this, how far do you want to drive) (include an option for out of state)</div>
        <Form.Label htmlFor="range-select">Would you like to explore a particular mountain range on your next hike?</Form.Label>
        <Form.Select aria-label="range-select" id="range-select">
            <option value="0">No preference</option>
            <option value="elk">Elk Range</option>
            <option value="front">Front Range</option>
            <option value="mosquito">Mosquito Range</option>
            <option value="san juan">San Juan Range</option>
            <option value="sangre de cristo">Sangre de Cristo Range</option>
            <option value="sawatch">Sawatch Range</option>
            <option value="ten mile">Ten Mile Range</option>
        </Form.Select>
        <Form.Text id="class-description" muted>
            Not familiar with the mountain ranges of Colorado? Read more about each range here.
      </Form.Text>
        <Form.Label htmlFor="class-select">What is the highest class you are comfortable with?</Form.Label>
        <Form.Select aria-label="class-select" id="class-select">
            <option value="0">No preference</option>
            <option value="1">Class one</option>
            <option value="2">Class two</option>
            <option value="3">Class three</option>
            <option value="4">Class four</option>
            <option value="5">Class five</option>
        </Form.Select>
        <Form.Text id="class-description" muted>
            Not familiar with mountain classes? See our class guide here.
      </Form.Text>
        <Form.Label htmlFor="exposure-select">What is the highest level of exposure you are comfortable with?</Form.Label>
        <Form.Select aria-label="exposure-select" id="exposure-select">
            <option value="0">No preference</option>
            <option value="1">Little to no exposure</option>
            <option value="2">Low exposure</option>
            <option value="3">Medium exposure</option>
            <option value="4">High exposure</option>
            <option value="5">Very high exposure</option>
            <option value="6">Extreme exposure</option>
        </Form.Select>
        <Form.Text id="exposure-description" muted>
            Need help deciding? See the informational guide here.
      </Form.Text>
        <Form.Label htmlFor="traffic-select">What is your preference for traffic (other hikers) on your hike?</Form.Label>
        <Form.Select aria-label="traffic-select" id="traffic-select">
            <option value="0">No preference</option>
            <option value="1">Low traffic</option>
            <option value="2">Medium traffic</option>
            <option value="3">High traffic</option>
            <option value="4">Extreme traffic</option>
            <option value="5">Critical traffic</option>
        </Form.Select>
        <Form.Text id="traffic-description" muted>
            Note that traffic vary on each peak depending on season, day of the week, and route. The standard route on each peak typically has the most traffic.
      </Form.Text>
        <Form.Label htmlFor="length-select">How long of a hike are you looking for?</Form.Label>
        <Form.Select aria-label="length-select" id="length-select">
            <option value="0">No preference</option>
            <option value="1">Short hike (1-5 miles)</option>
            <option value="2">Moderate hike (6-10 miles)</option>
            <option value="3">Long hike (11-15 miles)</option>
            <option value="4">Very long hike (16-20 miles)</option>
            <option value="5">Extreme hike (21-26 miles)</option>
        </Form.Select>
        <Form.Text id="length-description" muted>
            Longer hikes may require a multi-day commitment and backpacking equipment.
      </Form.Text>
        <Form.Label htmlFor="elevationGain-select">How much elevation gain would you prefer?</Form.Label>
        <Form.Select aria-label="elevationGain-select" id="elevationGain-select">
            <option value="0">No preference</option>
            <option value="1">Very low elevation gain (1,400-2,000 ft)</option>
            <option value="2">Low elevation gain (2,001-3,000 ft)</option>
            <option value="3">Moderate elevation gain (3,001-4,000 ft)</option>
            <option value="4">High elevation gain (4,001-5,000 ft)</option>
            <option value="5">Very high elevation gain (5,001-6,000 ft)</option>
            <option value="5">Extreme elevation gain (6,001-7,500 ft)</option>
        </Form.Select>
        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form>
  );
}

export default UserForm;