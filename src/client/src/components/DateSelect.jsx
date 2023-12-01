import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { parseISO, format, parse, isValid } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import updateCompletedPeaks from "../helpers/updateCompletedPeaks";

function DateSelect ({ peak, dateCompleted, setDateCompleted }) {

    const [isValidDate, setIsValidDate] = useState(true);

    const handleDateChange = (date) => {
        setDateCompleted(date);
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (dateCompleted) {
            console.log(dateCompleted);
            // This issue is that the format function always returns a valid date, so the warning never shows
            // check on this. May need to write custom format function.
            const formattedDate = format(dateCompleted, 'yyyy-MM-dd');
            console.log(formattedDate);
            setIsValidDate(dateRegex.test(formattedDate));
            console.log(isValidDate);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
            if (isValidDate) {
              const formattedDate = format(dateCompleted, 'yyyy-MM-dd');
              peak.date_completed = formattedDate;
              updateCompletedPeaks(peak);
            } else {
              // Display this as an error message
              console.error('Invalid date format');
            }
          // setDateCompleted("");
          // You need to add front end checks to make sure the user enters a correct date format 'YYYY-MM-DD'
          // Hover effect on buttons not working properly
          // Chosen date reflects day before for some reason
      }

    return (
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Text className="date-completed-text">Date Completed</Form.Text>
            <Form.Group>
                <InputGroup className="my-2 date-input">
                    <DatePicker
                    selected={dateCompleted ? dateCompleted : peak.date_completed ? parseISO(peak.date_completed) : null}
                    onChange={(date) => handleDateChange(date)}
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
            {!isValidDate ? (
            <div className="invalid-date-text">Invalid date format (YYYY-MM-DD)</div>
            ) : null}
        </Form>
    )
}

export default DateSelect;