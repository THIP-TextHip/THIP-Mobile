export interface CurrentVoteType {
  content: string;
  page: number;
  isOverview: boolean;
  voteItems: {
    itemName: string;
  }[];
}

export interface GroupDetailResponseType {
  isHost: boolean;
  roomId: number;
  roomName: string;
  roomImageUrl: string;
  isPublic: boolean;
  progressStartDate: string;
  progressEndDate: string;
  category: string;
  categoryColor: string;
  roomDescription: string;
  memberCount: number;
  recruitCount: number;
  isbn: string;
  bookTitle: string;
  authorName: string;
  currentPage: number;
  userPercentage: number;
  currentVotes: CurrentVoteType[];
}
