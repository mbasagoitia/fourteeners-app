import React from 'react';
import { StarFill, StarHalf, Star } from 'react-bootstrap-icons';

const RatingStars = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    const roundedRating = Math.round(rating * 2) / 2;

    for (let i = 0; i < 5; i += 1) {
      if (i < roundedRating - 0.5) {
        stars.push(<StarFill key={i} className="text-warning" />);
      } else if (i + 0.5 === roundedRating && roundedRating % 1 !== 0) {
        stars.push(<StarHalf key={i} className="text-warning" />);
      } else {
        stars.push(<Star key={i} className="text-secondary" />);
      }
    }

    return stars;
  };

  return <div>{renderStars()}</div>;
};

export default RatingStars;
