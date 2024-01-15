import React from 'react';
import { StarFill, StarHalf, Star } from 'react-bootstrap-icons';

const RatingStars = ({ rating }) => {
  console.log(rating);
  const renderStars = () => {
    const stars = [];
    const roundedRating = Math.round(rating * 2) / 2;

    for (let i = 0.5; i <= 2.5; i += 0.5) {
      if (i <= roundedRating) {
        stars.push(<StarFill key={i} className="text-warning" />);
      } else if (i - 0.5 < roundedRating) {
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
