import { useState, useEffect } from "react";
import fetchFeedback from "../helpers/fetchFeedback";
import RatingStars from "./RatingStars";

const StarRatings = ({ peak }) => {

    const [feedback, setFeedback] = useState(null);
    const [feedbackFetched, setFeedbackFetched] = useState(false);

    useEffect(() => {
        fetchFeedback(peak.id)
        .then((feedback) => {
          setFeedback(feedback);
          setFeedbackFetched(true);
        })
        .catch((error) => {
          console.error(error);
        });
      }, [])

    return (
        feedbackFetched && (
            <>
            <div className="overall-stars">
                <div>Overall Score</div>
                <RatingStars rating={feedback.numericFeedback[0].avgOverall} />
            </div>
    
            <div className="d-flex justify-content-evenly mt-4">
                <div>
                    <span>Effectiveness</span>
                    <RatingStars rating={feedback.numericFeedback[0].avgEffectiveness} />
                    <span>Relevance</span>
                    <RatingStars rating={feedback.numericFeedback[0].avgRelevance} />
                </div>
                <div>
                    <span>Usability</span>
                    <RatingStars rating={feedback.numericFeedback[0].avgUsability} />
                    <span>Future Use</span>
                    <RatingStars rating={feedback.numericFeedback[0].avgFutureUse} />
                </div>
            </div>
            </>
        )
    )
}

export default StarRatings;