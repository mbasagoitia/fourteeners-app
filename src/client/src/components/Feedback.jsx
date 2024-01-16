import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import RatingStars from "./RatingStars";

const Feedback = ({ peak, feedback }) => {
    const overallScore = feedback.numericFeedback[0].avgOverall;
}