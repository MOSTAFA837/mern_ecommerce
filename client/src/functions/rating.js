import React from "react";
import StarRating from "react-star-ratings";

export const showAverage = (product) => {
  if (product && product.ratings) {
    let productRatings = product && product.ratings;
    let ratings = []; // [5, 3]
    let length = productRatings.length; // 2

    productRatings.map((rate) => ratings.push(rate.star));

    let totalReduced = ratings.reduce((prev, next) => prev + next, 0); // 8
    let highest = length * 5; // 10
    let result = (totalReduced * 5) / highest;

    return (
      <div className="text-center pt-1 pb-3">
        <span>
          <StarRating
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="red"
            rating={result}
            editing={false}
          />{" "}
          ({product.ratings.length})
        </span>
      </div>
    );
  }
};
