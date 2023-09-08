import { createDraftSafeSelector } from "@reduxjs/toolkit";

import { RootState } from "../store";

import { GlobalCollectionsState, ICollectionState } from "./types";

export const selectRoot = (state: RootState) => state;

export const selectGlobalCollectionsState = createDraftSafeSelector(
  selectRoot,
  (state: RootState): GlobalCollectionsState => state?.globalCollections
);

export const selectGlobalCollections = createDraftSafeSelector(
  selectGlobalCollectionsState,
  (
    state: GlobalCollectionsState
  ): GlobalCollectionsState["globalCollections"] => state?.globalCollections
);

export const selectIsGlobalCollectionsLoading = createDraftSafeSelector(
  selectGlobalCollectionsState,
  (
    state: GlobalCollectionsState
  ): GlobalCollectionsState["isGlobalCollectionsLoading"] =>
    state?.isGlobalCollectionsLoading
);

export const selectGlobalCollectionsError = createDraftSafeSelector(
  selectGlobalCollectionsState,
  (state: GlobalCollectionsState) => state?.globalCollectionsError
);

export const selectCollectionStateById = (
  state: RootState,
  collectionId: string
): ICollectionState | undefined =>
  state.globalCollections.globalCollections?.find(
    ({ collection }) => collection.id === collectionId
  );

export const selectCollectionProfileById = (
  state: RootState,
  collectionId: string
): ICollectionState["profile"] | undefined => {
  const collectionState = selectCollectionStateById(state, collectionId);
  return collectionState?.profile;
};
export const selectCollectionProfileLoadingById = (
  state: RootState,
  collectionId: string
): ICollectionState["isProfileLoading"] | undefined => {
  const collectionState = selectCollectionStateById(state, collectionId);
  return collectionState?.isProfileLoading;
};

export const selectCollectionProfileErrorById = (
  state: RootState,
  collectionId: string
): ICollectionState["profileError"] | undefined => {
  const collectionState = selectCollectionStateById(state, collectionId);
  return collectionState?.profileError;
};

export const selectCollectionTagsById = (
  state: RootState,
  collectionId: string
): ICollectionState["tags"] | undefined => {
  const collectionState = selectCollectionStateById(state, collectionId);
  return collectionState?.tags;
};

export const selectCollectionTagsLoadingById = (
  state: RootState,
  collectionId: string
): ICollectionState["isTagsLoading"] | undefined => {
  const collectionState = selectCollectionStateById(state, collectionId);
  return collectionState?.isTagsLoading;
};

export const selectCollectionTagsErrorById = (
  state: RootState,
  collectionId: string
): ICollectionState["tagsError"] | undefined => {
  const collectionState = selectCollectionStateById(state, collectionId);
  return collectionState?.tagsError;
};
