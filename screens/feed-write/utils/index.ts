interface FeedEditState {
  contentBody: string;
  isPublic: boolean;
  imageUrls: string[];
  selectedTagList: string[];
}

const isSameStringArray = (left: string[], right: string[]) =>
  left.length === right.length && left.every((item, index) => item === right[index]);

export const isSameFeedEditState = (
  prevFeed: FeedEditState | null,
  currentFeed: FeedEditState,
) => {
  if (prevFeed === null) {
    return false;
  }

  return (
    prevFeed.contentBody.trim() === currentFeed.contentBody.trim() &&
    prevFeed.isPublic === currentFeed.isPublic &&
    isSameStringArray(prevFeed.imageUrls, currentFeed.imageUrls) &&
    isSameStringArray(prevFeed.selectedTagList, currentFeed.selectedTagList)
  );
};
