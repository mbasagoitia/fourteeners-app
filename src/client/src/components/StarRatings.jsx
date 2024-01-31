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

    const {
        avgEffectiveness,
        avgFutureUse,
        avgRelevance,
        avgUsability,
        avgOverall,
      } = feedback.numericFeedback[0];
      
      const effectivenessScore = avgEffectiveness;
      const futureUseScore = avgFutureUse;
      const relevanceScore = avgRelevance;
      const usabilityScore = avgUsability;
      const overallScore = avgOverall;

    return (
        feedbackFetched ? (
            <>
            <div className="overall-stars">
                <div>Overall Score</div>
                <RatingStars rating={overallScore} />
            </div>
    
            <div className="d-flex justify-content-evenly mt-4">
                <div>
                    <span>Effectiveness</span>
                    <RatingStars rating={effectivenessScore} />
                    <span>Relevance</span>
                    <RatingStars rating={relevanceScore} />
                </div>
                <div>
                    <span>Usability</span>
                    <RatingStars rating={usabilityScore} />
                    <span>Future Use</span>
                    <RatingStars rating={futureUseScore} />
                </div>
            </div>
            </>
        ) : null
    )
}

export default StarRatings;