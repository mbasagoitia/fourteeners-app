import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import updateCompletedPeaks from "../helpers/updateCompletedPeaks";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CompletedPeakCard ({ peak, editMode, handlePeakDelete }) {

  const [dateCompleted, setDateCompleted] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dateCompleted) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(dateCompleted)) {
        console.log('Invalid date format. Please enter date in YYYY-MM-DD format.');
        return;
      }
      peak.date_completed = dateCompleted;
      updateCompletedPeaks(peak);
      // setDateCompleted("");
      // You need to add front end checks to make sure the user enters a correct date format 'YYYY-MM-DD'
      // Hover effect on buttons not working properly
    }
  }

  return (
      <Card style={{ width: "18rem" }} className="completed-peak-card">
      <Card.Img variant="top" src={peak.img} />
      <Card.Body>
        <Card.Title>{peak.name}</Card.Title>
        <Card.Text>{peak.elevation.toLocaleString()} ft.</Card.Text>
        <Card.Text className="card-range-text">{peak.range} Range</Card.Text>
        {editMode ? (
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group>
              <Form.Text>Date Completed</Form.Text>
              <InputGroup className="mb-2 date-input">
              <DatePicker
                selected={peak.date_completed || dateCompleted}
                onChange={(date) => {
                  setDateCompleted(date);
                }}
                dateFormat="yyyy-MM-dd"
                aria-label="Date completed"
                placeholderText="YYYY-MM-DD"
                showClearButton={true}
              />
              <Button type="submit" className="save-date-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mb-1" viewBox="0 0 16 16">
              <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
              </svg>
              </Button>
              </InputGroup>
              </Form.Group>
          </Form>
          ) : (peak.date_completed && `Completed On ${peak.date_completed}`) || null}


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