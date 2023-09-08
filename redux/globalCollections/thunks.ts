/* eslint-disable no-param-reassign */

import { requestGlobalCollections } from "@/requests/blocksync-v2";
import requestCollectionProfile from "@/requests/requesters/requestCollectionProfile";
import requestCollectionTags from "@/requests/requesters/requestCollectionTags";

import type { AppThunk } from "../store";
import {
  setCollectionProfile,
  setCollectionProfileError,
  setCollectionTags,
  setCollectionTagsError,
  setGlobalCollections,
  setGlobalCollectionsError,
  setIsCollectionProfileLoading,
  setIsCollectionTagsLoading,
  setIsGlobalCollectionsLoading,
} from "./slice";
import { selectCollectionById } from "./selectors";

export const fetchGlobalCollections = (): AppThunk => async (dispatch) => {
  dispatch(setIsGlobalCollectionsLoading(true));

  const { data: collections, error } = await requestGlobalCollections();
  if (error) {
    dispatch(setGlobalCollectionsError(error));
  } else if (!collections) {
    dispatch(
      setGlobalCollectionsError(
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

export const fetchCollectionsTags =
  (collectionId: string): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const collectionState = selectCollectionById(state, collectionId);
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
