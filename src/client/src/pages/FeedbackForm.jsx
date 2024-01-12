import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import Effectiveness from '../components/feedbackFormQuestions/Effectiveness';
import Usability from '../components/feedbackFormQuestions/Usability';
import Relevance from '../components/feedbackFormQuestions/Relevance';
import FutureUse from '../components/feedbackFormQuestions/FutureUse';
import OverallExperience from '../components/feedbackFormQuestions/OverallExperience';
import Improvements from '../components/feedbackFormQuestions/Improvements';
import MountainSpecificFeedback from '../components/feedbackFormQuestions/MountainSpecificFeedback';

function FeedbackForm ({ user }) {

  // Select which peak you would like to rate/review the 14er Summit Selector Tool for:
  // List of all peaks, make searchable
  const [peak, setPeak] = useState(null);

  const [effectiveness, setEffectiveness] = useState(0);
  const [usability, setUsability] = useState(0);
  const [relevance, setRelevance] = useState(0);
  const [futureUse, setFutureUse] = useState(0);
  const [overallExperience, setOverallExperience] = useState(0);
  const [improvements, setImprovements] = useState('');
  const [mountainSpecificFeedback, setMountainSpecificFeedback] = useState('');

  const handleSubmit = () => {
    // You will want to send a fetch request including the user's credentials and the peak id.
    // Store the text answers in the database for admin access, and send the numeric ratings to the database
    // for further processing which will include adding to the overall average of all users' responses.
    console.log({
      effectiveness,
      usability,
      relevance,
      futureUse,
      overallExperience,
      improvements,
      mountainSpecificFeedback,
    });
  };

  return (
    <Form>
      <h1>Provide Feedback on the 14er Summit Selector Tool</h1>
      <p>Please answer the questions below and provide any suggestions you have to improve this feature.</p>
      <Effectiveness setEffectiveness={setEffectiveness} />
      <Relevance setRelevance={setRelevance} />
      <Usability setUsability={setUsability} />
      <MountainSpecificFeedback mountainSpecificFeedback={mountainSpecificFeedback} setMountainSpecificFeedback={setMountainSpecificFeedback} />
      <FutureUse setFutureUse={setFutureUse} />
      <Improvements improvements={improvements} setImprovements={setImprovements} />
      <OverallExperience setOverallExperience={setOverallExperience} />
      <Button variant="primary" onClick={handleSubmit}>Submit Feedback</Button>
    </Form>
  );
};

export default FeedbackForm;




