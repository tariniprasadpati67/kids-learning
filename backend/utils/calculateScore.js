/**
 * Calculates game score, percentage, and stars
 * Stars criteria:
 * 90 - 100% -> 5 stars
 * 70 - 89%  -> 4 stars
 * 50 - 69%  -> 3 stars
 * 30 - 49%  -> 2 stars
 * 0 - 29%   -> 1 star
 */
const calculateScore = (correctAnswers, totalQuestions) => {
  if (!totalQuestions || totalQuestions <= 0) {
    return { score: 0, percentage: 0, stars: 1 };
  }

  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const score = correctAnswers * 10;
  let stars = 1;

  if (percentage >= 90) stars = 5;
  else if (percentage >= 70) stars = 4;
  else if (percentage >= 50) stars = 3;
  else if (percentage >= 30) stars = 2;
  else stars = 1;

  return {
    score,
    percentage,
    stars
  };
};

module.exports = calculateScore;
