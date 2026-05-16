export const calculateVoteFillPercent = (
  voteCount: number,
  totalCount: number,
) => {
  if (totalCount === 0) {
    return 0;
  }

  const percent = (voteCount / totalCount) * 100;
  return Math.min(100, Math.max(0, percent));
};
