import CompletedPeakCard from "../components/CompletedPeakCard";

function CompletedPeaksList({ peaks, editMode, handlePeakDelete }) {
    return (
      <div className="content-container">
        <div className="completed-peaks-container mt-4">
          {peaks.map((peak, idx) => (
            <CompletedPeakCard key={idx} peak={peak} editMode={editMode} handlePeakDelete={handlePeakDelete} />
          ))}
        </div>
      </div>
    );
  }

export default CompletedPeaksList;