import React from "react";

const StarFilled = ({ className = "w-5 h-5 text-yellow-500" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2.25l2.92 5.91 6.53.95-4.72 4.6 1.11 6.49L12 17.77l-5.83 3.07 1.11-6.49-4.72-4.6 6.53-.95L12 2.25z" />
  </svg>
);

export default StarFilled;
