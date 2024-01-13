import { Form, Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import Effectiveness from '../components/feedbackFormQuestions/Effectiveness';
import Usability from '../components/feedbackFormQuestions/Usability';
import Relevance from '../components/feedbackFormQuestions/Relevance';
import FutureUse from '../components/feedbackFormQuestions/FutureUse';
import OverallExperience from '../components/feedbackFormQuestions/OverallExperience';
import Improvements from '../components/feedbackFormQuestions/Improvements';
import MountainSpecificFeedback from '../components/feedbackFormQuestions/MountainSpecificFeedback';
import addUserFeedback from '../helpers/addUserFeedback';

function FeedbackForm ({ user }) {

  // Select which peak you would like to rate/review the 14er Summit Selector Tool for:
  // List of all peaks, make searchable
  const [peak, setPeak] = useState(null);

  const [effectiveness, setEffectiveness] = useState(0);
  const [usability, setUsability] = useState(0);
  const [relevance, setRelevance] = useState(0);
  const [futureUse, setFutureUse] = useState(0);
  const [overallExperience, setOverallExperience] = useState(0);
  const [improvements, setImprovements] = useState({});
  const [mountainSpecificFeedback, setMountainSpecificFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // You will want to send a fetch request including the user's credentials and the peak id.
    // Add in the list of peaks to choose from.
    // Store the text answers in the database for admin access, and send the numeric ratings to the database
    // for further processing which will include adding to the overall average of all users' responses.
    // Show mountain specific feedback, along with numeric feedback average scores, on the browse all peaks page.
    // Add a link on the results page for each peak to the link that allows users to browse the reviews/ratings
    // Include number of ratings

    const userFeedback = {
      userId: user.id,
      peakId: peak.id,
      effectiveness,
      usability,
      relevance,
      futureUse,
      overallExperience,
      improvements,
      mountainSpecificFeedback,
    };

    addUserFeedback(userFeedback);
    
  };

  return (
    <Container>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <h1>Provide Feedback on the 14er Summit Selector Tool</h1>
        <p>Please answer the questions below and provide any suggestions you have to improve this feature.</p>

        <p>Which 14er would you like to review the tool for?</p>
        <p>List of mountains</p>
        <Effectiveness setEffectiveness={setEffectiveness} />
        <Relevance setRelevance={setRelevance} />
        <Usability setUsability={setUsability} />
        <MountainSpecificFeedback mountainSpecificFeedback={mountainSpecificFeedback} setMountainSpecificFeedback={setMountainSpecificFeedback} />
        <FutureUse setFutureUse={setFutureUse} />
        <Improvements improvements={improvements} setImprovements={setImprovements} />
        <OverallExperience setOverallExperience={setOverallExperience} />
        <Button variant="primary" type="submit">Submit Feedback</Button>
      </Form>
    </Container>
  );
};

export default FeedbackForm;




