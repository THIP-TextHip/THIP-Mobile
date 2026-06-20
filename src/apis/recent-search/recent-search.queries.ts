import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Toast from "react-native-toast-message";
import { deleteRecentSearchApi, getRecentSearchApi } from "./recent-search.api";
import { RECENT_SEARCH_QUERY_KEY } from "./recent-search.query-key";
import {
  GetRecentSearchResponse,
  RecentSearchType,
} from "./recent-search.types";

export const useGetRecentSearchQuery = (type: RecentSearchType) => {
  const { data } = useQuery<GetRecentSearchResponse, Error>({
    queryKey: RECENT_SEARCH_QUERY_KEY.LIST(type),
    queryFn: () => getRecentSearchApi(type),
  });

  const recentSearchList = data?.recentSearchList ?? [];

  return { recentSearchList };
};

export const useDeleteRecentSearchMutation = (type: RecentSearchType) => {
  const queryClient = useQueryClient();

  const { mutate: deleteRecentSearch } = useMutation<void, Error, number>({
    mutationFn: (recentSearchId: number) =>
      deleteRecentSearchApi(recentSearchId),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: RECENT_SEARCH_QUERY_KEY.LIST(type),
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: `${error.message}`,
      });
    },
  });

  return {
    deleteRecentSearch,
  };
};
