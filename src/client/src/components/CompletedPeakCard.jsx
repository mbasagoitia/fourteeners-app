import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DateSelect from "../components/DateSelect";
import { format, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';

function CompletedPeakCard ({ peak, editMode, handlePeakDelete }) {

  const [dateCompleted, setDateCompleted] = useState(peak.date_completed ? peak.dateCompleted : "");

  const formatDate = (dateCompleted) => {
      const date = parseISO(dateCompleted);
      const formattedDate = format(date, "MMMM dd, yyyy", { locale: enUS });
      return formattedDate;
  }

  return (
      <Card style={{ width: "18rem" }} className="completed-peak-card">
      <Card.Img variant="top" src={peak.img} />
      <Card.Body>
        <Card.Title>{peak.name}</Card.Title>
        <Card.Text>{peak.elevation.toLocaleString()} ft.</Card.Text>
        <Card.Text className="card-range-text">{peak.range} Range</Card.Text>
        {editMode ? (
          <DateSelect peak={peak} dateCompleted={dateCompleted} setDateCompleted={setDateCompleted} />
          ) : (
            <div className="mb-4">{peak.date_completed && `Completed On ${formatDate(peak.date_completed)}`}</div>
          ) || null}

        {editMode ? (
          <>
          <div className="edit-btns-wrapper">
          <Button className="add-photos-btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mb-1" viewBox="0 0 16 16">
          <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
          <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
          </svg>
          </Button>
          <Button onClick={() => handlePeakDelete(peak)} className="delete-peak-btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mb-1" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
          </svg>
          </Button>
          </div>
          </>
        ) : <Button variant="primary">View Details</Button>}
      </Card.Body>
    </Card>
  )
}

export default CompletedPeakCard;   