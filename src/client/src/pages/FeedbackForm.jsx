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

  const [effectiveness, setEffectiveness] = useState(3);
  const [usability, setUsability] = useState(3);
  const [relevance, setRelevance] = useState(3);
  const [futureUse, setFutureUse] = useState(3);
  const [overallExperience, setOverallExperience] = useState(3);
  const [improvements, setImprovements] = useState({});
  const [mountainSpecificFeedback, setMountainSpecificFeedback] = useState("");

  useEffect(() => {
    // Check if the user is logged in, if not, redirect to the login page
    if (!user && onLoginRedirect) {
      onLoginRedirect();
    }
  }, [user, onLoginRedirect]);

  const handleSubmit = (e) => {
    e.preventDefault();

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

  const isPeakSelected = (peak) => {
    return peakToReview === peak;
  };

  const handleItemClick = (peak) => {
    setPeakToReview(peak);
  }

  const handleSubmitNewReview = () => {
    setFeedbackSubmitted(false);
    setPeakToReview(null);
  }

  return (
    <div className="content-container">
        <div className="overlay-container">
          <div className="fullsize-overlay-box">
          {!feedbackSubmitted ? (
                <Form onSubmit={(e) => handleSubmit(e)} className="fb-form">
                  <h1>Provide Feedback on the 14er Summit Selector Tool</h1>
                  <p>Please answer the questions below and provide any suggestions you have to improve this feature.</p>
          
                  <p>Which 14er would you like to review the tool for?</p>
                  {peakToReview ? <h2>{peakToReview.name}</h2> : null}
                  <div className="fb-peaks-search">
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
                    <Button variant="primary" type="submit" className="my-4">Submit</Button>
                  </div>
                </Form>
          ) : (
            <div className="h-100 d-flex flex-column justify-content-center">
              <p>Thank you for your submission! We appreciate your feedback.</p>
              <Button onClick={handleSubmitNewReview} className="align-self-center">Submit another review</Button>
            </div>
          )}
          </div>
        </div>
    </div>
  );
};

export default FeedbackForm;




