import { Form, Button, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Effectiveness from '../components/feedbackFormQuestions/Effectiveness';
import Usability from '../components/feedbackFormQuestions/Usability';
import Relevance from '../components/feedbackFormQuestions/Relevance';
import FutureUse from '../components/feedbackFormQuestions/FutureUse';
import OverallExperience from '../components/feedbackFormQuestions/OverallExperience';
import Improvements from '../components/feedbackFormQuestions/Improvements';
import MountainSpecificFeedback from '../components/feedbackFormQuestions/MountainSpecificFeedback';
import addUserFeedback from '../helpers/addUserFeedback';
import SearchablePeaksList from '../components/SearchablePeaksList';

function FeedbackForm ({ user, peaks, onLoginRedirect }) {

  const [peakToReview, setPeakToReview] = useState(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const [effectiveness, setEffectiveness] = useState(0);
  const [usability, setUsability] = useState(0);
  const [relevance, setRelevance] = useState(0);
  const [futureUse, setFutureUse] = useState(0);
  const [overallExperience, setOverallExperience] = useState(0);
  const [improvements, setImprovements] = useState({});
  const [mountainSpecificFeedback, setMountainSpecificFeedback] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in, if not, redirect to the login page
    if (!user && onLoginRedirect) {
      onLoginRedirect();
    }
  }, [user, onLoginRedirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You will want to send a fetch request including the user's credentials and the peak id.
    // Add in the list of peaks to choose from.
    // Store the text answers in the database for admin access, and send the numeric ratings to the database
    // for further processing which will include adding to the overall average of all users' responses.
    // Show mountain specific feedback, along with numeric feedback average scores, on the browse all peaks page.
    // Add a link on the results page for each peak to the link that allows users to browse the reviews/ratings
    // Include number of ratings
    // Indicate that 5 is the highest score and 1 is the lowest.

    const userFeedback = {
      userId: user.id,
      peakId: peakToReview.id,
      effectiveness,
      usability,
      relevance,
      futureUse,
      overallExperience,
      improvements,
      mountainSpecificFeedback,
    };

    addUserFeedback(userFeedback);
    setFeedbackSubmitted(true);
  };

  // Will apply the conditional CSS styles to the list item once clicked
  const isPeakSelected = (peak) => {
    return peakToReview === peak;
  };

  // Sets the state of the peak to be reviewed to the selected peak
  const handleItemClick = (peak) => {
    setPeakToReview(peak);
  }

  const handleSubmitNewReview = () => {
    setFeedbackSubmitted(false);
    setPeakToReview(null);
  }

  return (
    <Container>
      {!feedbackSubmitted ? (
            <Form onSubmit={(e) => handleSubmit(e)}>
              <h1>Provide Feedback on the 14er Summit Selector Tool</h1>
              <p>Please answer the questions below and provide any suggestions you have to improve this feature.</p>
      
              <p>Which 14er would you like to review the tool for?</p>
              {peakToReview ? <h2>{peakToReview.name}</h2> : null}
              <div style={{ height: "40vh", overflowY: "scroll" }} className="mb-4">
                <SearchablePeaksList items={peaks} onItemClick={handleItemClick} isItemSelected={isPeakSelected} />
              </div>
            
              <div style={{ display: peakToReview ? "block" : "none" }}>
                <Effectiveness setEffectiveness={setEffectiveness} peak={peakToReview} />
                <Relevance setRelevance={setRelevance} />
                <Usability setUsability={setUsability} />
                <MountainSpecificFeedback mountainSpecificFeedback={mountainSpecificFeedback} setMountainSpecificFeedback={setMountainSpecificFeedback} />
                <FutureUse setFutureUse={setFutureUse} />
                <Improvements improvements={improvements} setImprovements={setImprovements} />
                <OverallExperience setOverallExperience={setOverallExperience} />
                <Button variant="primary" type="submit">Submit Feedback</Button>
              </div>
            </Form>
      ) : (
        <>
        <p>Thank you for your submission! We appreciate your feedback.</p>
        <Button onClick={handleSubmitNewReview}>Submit another review</Button>
        </>
      )}
    </Container>
  );
};

export default FeedbackForm;




