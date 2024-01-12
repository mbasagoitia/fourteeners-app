import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import Effectiveness from '../components/feedbackFormQuestions/Effectiveness';
import Usability from '../components/feedbackFormQuestions/Usability';
import Relevance from '../components/feedbackFormQuestions/Relevance';
import FutureUse from '../components/feedbackFormQuestions/FutureUse';
import OverallExperience from '../components/feedbackFormQuestions/OverallExperience';
import Improvements from '../components/feedbackFormQuestions/Improvements';
import MountainSpecificFeedback from '../components/feedbackFormQuestions/MountainSpecificFeedback';

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
      <Effectiveness />
      <Relevance />
      <Usability />
      <MountainSpecificFeedback />
      <FutureUse />
      <Improvements />
      <OverallExperience />
      <Button variant="primary" onClick={handleSubmit}>Submit Feedback</Button>
    </Form>
  );
};

export default FeedbackForm;




