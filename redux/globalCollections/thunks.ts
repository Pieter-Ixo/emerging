/* eslint-disable no-param-reassign */

import { requestGlobalCollections } from "@/requests/blocksync-v2";
import requestCollectionProfile from "@/requests/requesters/requestCollectionProfile";

import type { AppThunk } from "../store";
import {
  setCollectionProfile,
  setCollectionProfileLoadingError,
  setGlobalCollections,
  setGlobalCollectionsLoadingError,
  setIsCollectionProfileLoading,
  setIsGlobalCollectionsLoading,
} from "./slice";
import { selectCollectionById } from "./selectors";

export const fetchGlobalCollections = (): AppThunk => async (dispatch) => {
  dispatch(setIsGlobalCollectionsLoading(true));

  const { data: collections, error } = await requestGlobalCollections();
  if (error) {
    dispatch(setGlobalCollectionsLoadingError(error));
  } else if (!collections) {
    dispatch(
      setGlobalCollectionsLoadingError(
        new Error("unknown error while loading global collections")
      )
    );
  } else {
    dispatch(setGlobalCollections(collections));
  }

  dispatch(setIsGlobalCollectionsLoading(false));
};

export const fetchCollectionsProfile =
  (collectionId: string): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const collectionState = selectCollectionById(state, collectionId);
    const collection = collectionState?.collection;

    if (!collection) {
      dispatch(
        setCollectionProfileLoadingError({
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
        setCollectionProfileLoadingError({
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

export default {};
