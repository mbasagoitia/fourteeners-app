import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

function FeedbackForm () {

  // Select which peak you would like to rate/review the 14er Summit Selector Tool for:
  // List of all peaks, make searchable

  const [effectiveness, setEffectiveness] = useState(0);
  const [usability, setUsability] = useState(0);
  const [relevance, setRelevance] = useState(0);
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


      {/* Usability */}



      {/* Relevance */}



      {/* Future use */}


      {/* Overall experience */}


      {/* Improvements */}
      {/* ms feedback */}
      <Button variant="primary" onClick={handleSubmit}>Submit Feedback</Button>
    </Form>
  );
};

export default FeedbackForm;




