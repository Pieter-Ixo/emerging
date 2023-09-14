/* eslint-disable no-param-reassign */

import requestCollectionTags from "@/requests/requesters/requestCollectionTags";

import type { AppThunk } from "../../store";
import {
  setCollectionProfileError,
  setCollectionTags,
  setCollectionTagsError,
  setIsCollectionTagsLoading,
} from "../slice";
import { selectCollectionStateById } from "../selectors";

export default function fetchCollectionsTags(collectionId: string): AppThunk {
  return async (dispatch, getState) => {
    const state = getState();
    const collectionState = selectCollectionStateById(state, collectionId);
    const collection = collectionState?.collection;

    if (!collection) {
      dispatch(
        setCollectionTagsError({
          id: collectionId,
          error: new Error("can not load collection tags, no collection"),
        })
      );
      return;
    }

    dispatch(setIsCollectionTagsLoading({ id: collectionId, isLoading: true }));

    const tags = await requestCollectionTags(collection);
    if (!tags)
      dispatch(
        setCollectionProfileError({
          id: collectionId,
          error: new Error("unknown error while loading global collections"),
        })
      );
    else
      dispatch(
        setCollectionTags({
          id: collectionId,
          tags,
        })
      );

    dispatch(
      setIsCollectionTagsLoading({ id: collectionId, isLoading: false })
    );
  };
}
