/* eslint-disable no-param-reassign */

import requestCollectionProfile from "@/requests/requesters/requestCollectionProfile";

import type { AppThunk } from "../../store";
import {
  setCollectionProfile,
  setCollectionProfileError,
  setIsCollectionProfileLoading,
} from "../slice";
import { selectCollectionStateById } from "../selectors";

export default function fetchCollectionsProfile(
  collectionId: string
): AppThunk {
  return async (dispatch, getState) => {
    const state = getState();
    const collectionState = selectCollectionStateById(state, collectionId);
    const collection = collectionState?.collection;

    if (!collection) {
      dispatch(
        setCollectionProfileError({
          id: collectionId,
          error: new Error("can not load collection profile, no collection"),
        })
      );
      return;
    }

    dispatch(
      setIsCollectionProfileLoading({ id: collectionId, isLoading: true })
    );

    const profile = await requestCollectionProfile(collection);
    if (!profile)
      dispatch(
        setCollectionProfileError({
          id: collectionId,
          error: new Error("unknown error while loading global collections"),
        })
      );
    else
      dispatch(
        setCollectionProfile({
          id: collectionId,
          profile,
        })
      );

    dispatch(
      setIsCollectionProfileLoading({ id: collectionId, isLoading: false })
    );
  };
}
