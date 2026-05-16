export const calculateVoteFillPercent = (
  voteCount: number,
  totalCount: number,
) => {
  if (totalCount === 0) {
    return 0;
  }

  return (voteCount / totalCount) * 100;
};
