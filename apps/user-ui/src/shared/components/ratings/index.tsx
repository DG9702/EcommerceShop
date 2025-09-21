
import HalfStar from "apps/user-ui/src/assets/icons/half-star";
import StarFilled from "apps/user-ui/src/assets/icons/star-filled";
import StarOutline from "apps/user-ui/src/assets/icons/star-outline";
import React, { FC } from "react";

type Props = {
  rating: number;
};

const Ratings: FC<Props> = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<StarFilled key={`star-${i}`} />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<HalfStar key={`star-${i}`} />);
    } else {
      stars.push(<StarOutline key={`star-${i}`} />);
    }
  }

  return <div className="flex gap-1">{stars}</div>;
};

export default Ratings;
