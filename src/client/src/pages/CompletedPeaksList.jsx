import { Button } from "react-bootstrap";
import CompletedPeakCard from "../components/CompletedPeakCard";

function CompletedPeaksList({ peaks, editMode, handlePeakDelete }) {

    return (
      <div className="completed-peaks-container mt-4">
        {peaks.map((peak, idx) => (
          <CompletedPeakCard key={idx} peak={peak} editMode={editMode} handlePeakDelete={handlePeakDelete} />
        ))}
      </div>
    );
  }

export default CompletedPeaksList;