import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { parseISO, format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import updateCompletedPeaks from "../helpers/updateCompletedPeaks";
import { FaCheck } from 'react-icons/fa'

function DateSelect ({ peak, dateCompleted, setDateCompleted }) {

    const [savedDateMsgShown, setSavedDateMsgShown] = useState(false);

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    const handleDateChange = (date) => {
        setDateCompleted(date);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (dateCompleted) {
            const formattedDate = format(dateCompleted, 'yyyy-MM-dd');
            if (dateRegex.test(formattedDate)) {
                peak.date_completed = formattedDate;
                updateCompletedPeaks(peak);
                setSavedDateMsgShown(true);
                setTimeout(() => {
                    setSavedDateMsgShown(false);
                }, 3000)
            } else {
                // Display this as an error message
                console.error('Invalid date format');
            }
        }
      }

    return (
        <Form onSubmit={(e) => handleSubmit(e)}>
            {savedDateMsgShown ? <Form.Text className="date-updated-text">Date successfully updated!</Form.Text> : <Form.Text className="date-completed-text">Date Completed</Form.Text>}
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
                    <Button type="submit" className="save-date-btn d-flex align-items-center"><FaCheck size={15} /></Button>
                </InputGroup>              
            </Form.Group>
        </Form>
    )
}

export default DateSelect;