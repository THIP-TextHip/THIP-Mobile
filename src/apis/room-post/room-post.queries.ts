import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import { ROOM_QUERY_KEY } from "../room";
import { changeRoomPostLikeStatusApi } from "./room-post.api";
import type {
  ChangeRoomPostLikeStatusRequest,
  ChangeRoomPostLikeStatusResponse,
} from "./room-post.types";

export const useChangeRoomPostLikeStatusMutation = () => {
  const queryClient = useQueryClient();

  const {
    mutate: changeRoomPostLikeStatus,
    isPending: isPendingChangeRoomPostLikeStatus,
  } = useMutation<
    ChangeRoomPostLikeStatusResponse,
    Error,
    ChangeRoomPostLikeStatusRequest
  >({
    mutationFn: changeRoomPostLikeStatusApi,
    // TODO: roomId 정보를 얻을 수가 없어서 추후 사용하는 곳에서 onSuccess를 정의하는 것으로 해결한다.
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOM_QUERY_KEY.ALL });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: `${error.message}`,
      });
    },
  });

  return {
    changeRoomPostLikeStatus,
    isPendingChangeRoomPostLikeStatus,
  };
};
