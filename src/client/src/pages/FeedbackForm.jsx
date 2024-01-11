import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function FeedbackForm () {

  const [effectiveness, setEffectiveness] = useState(0);
  const [usability, setUsability] = useState(0);
  const [relevanceOfCriteria, setRelevanceOfCriteria] = useState(0);
  const [futureUse, setFutureUse] = useState(0);
  const [overallExperience, setOverallExperience] = useState(0);
  const [improvements, setImprovements] = useState('');
  const [mountainSpecificFeedback, setMountainSpecificFeedback] = useState('');

  const handleRatingChange = (category, value) => {
    // These will need to be averages of all responses in each category.
    // How to handle option of N/A? Or make all required?

    switch (category) {
      case 'effectiveness':
        setEffectiveness(value);
        break;
      case 'usability':
        setUsability(value);
        break;
      case 'relevanceOfCriteria':
        setRelevanceOfCriteria(value);
        break;
      case 'futureUse':
        setFutureUse(value);
        break;
      case 'overallExperience':
        setOverallExperience(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    console.log({
      effectiveness,
      usability,
      relevanceOfCriteria,
      futureUse,
      overallExperience,
      improvements,
      mountainSpecificFeedback,
    });
  };

  return (
    <Form>
      {/* Effectiveness */}
      <Form.Group controlId="effectiveness-1">
        <Form.Label>How accurately did the tool match specific peaks with your experience level?</Form.Label>
        <Row>
          {[1, 2, 3, 4, 5].map((value) => (
            <Col key={value}>
              <Form.Check
                inline
                type="radio"
                label={value}
                name="effectiveness-1"
                // Issue here with the handleRatingChange function... need to account for averages
                onChange={() => handleRatingChange('effectiveness', value)}
              />
            </Col>
          ))}
        </Row>
      </Form.Group>

      <Form.Group controlId="effectiveness-2">
        <Form.Label>Did the recommended class and exposure level align with your comfort level for hiking?</Form.Label>
        <Row>
          {[1, 2, 3, 4, 5].map((value) => (
            <Col key={value}>
              <Form.Check
                inline
                type="radio"
                label={value}
                name="effectiveness-2"
                onChange={() => handleRatingChange('effectiveness', value)}
              />
            </Col>
          ))}
        </Row>
      </Form.Group>

      <Form.Group controlId="effectiveness-3">
        <Form.Label>Did the recommended route on (peak name) (if any) match your comfort and experience level? (option for N/A)</Form.Label>
        <Row>
          {[1, 2, 3, 4, 5].map((value) => (
            <Col key={value}>
              <Form.Check
                inline
                type="radio"
                label={value}
                name="effectiveness-3"
                onChange={() => handleRatingChange('effectiveness', value)}
              />
            </Col>
          ))}
        </Row>
      </Form.Group>

      {/* Similar sections for other star-based questions */}

      <Form.Group controlId="improvements">
        <Form.Label>Improvements</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={improvements}
          onChange={(e) => setImprovements(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="mountainSpecificFeedback">
        <Form.Label>Mountain-Specific Feedback</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={mountainSpecificFeedback}
          onChange={(e) => setMountainSpecificFeedback(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" onClick={handleSubmit}>
        Submit Feedback
      </Button>
    </Form>
  );
};

export default FeedbackForm;

    // Have a form with the following questions:

    // Select which peak you would like to rate/review the 14er Summit Selector Tool for:
    // List of all peaks, make searchable

    // Effectiveness (star-based):
    //     How accurately did the tool match specific peaks with your experience level?
    //     Did the recommended class and exposure level align with your comfort level for hiking?
    //     Did the recommended route on {peak name} (if any) match your comfort and experience level? (option for N/A)

    // Usability (star-based):
    //     Was the tool easy to use and navigate?

    // Relevance of Criteria (star-based):
    //     How important were the criteria (experience level, class level, exposure level, etc.) in your decision-making process?
    //     How well did the tool's criteria align with your priorities when selecting a hiking peak?

    // Improvements (text answers):
    //     Were there any criteria (experience level, exposure level, etc.) that you found to be not useful?
    //     Were there any additional criteria you wished the tool had considered?
    //     Are there specific areas where you think the tool could be improved?
    //     Do you have any suggestions for additional features or criteria that could enhance the tool?

    // Mountain-Specific Feedback (text answers):
    //     If applicable, provide feedback on the specific mountain recommended by the tool.

    // Future Use (star-based):
    //     Would you use the Summit Selector tool again for future hiking plans?
    //     How likely are you to recommend the tool to a friend or fellow hiker?

    // Overall Experience (star-based):
    //     How would you rate your overall experience with the Summit Selector tool?
    //     Did the tool help you find a suitable peak based on your preferences?
