import Button from "react-bootstrap/esm/Button";
import { BiErrorCircle } from 'react-icons/bi';

const NoRecsWarning = ({ handleEditPreferences }) => {
    return (
        <div className="no-recs-warning">
            <BiErrorCircle color="orange" size={50} />
            <p>Unfortunately, no peaks matched your preferences and experience level. Please adjust your criteria if desired.</p>
            <Button onClick={handleEditPreferences}>Edit Preferences</Button>
        </div>
    )
}

export default NoRecsWarning;