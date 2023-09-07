import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { ICollection } from "@/types/entityCollections";

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

export const selectGlobalCollectionsLoadingError = createDraftSafeSelector(
  selectGlobalCollectionsState,
  (state: GlobalCollectionsState) => state?.globalCollectionsLoadingError
);

export const selectCollectionById = (
  state: RootState,
  collectionId: string
): ICollectionState | undefined =>
  state.globalCollections.globalCollections.find(
    ({ collection }) => collection.id === collectionId
  );

export const selectCollectionProfileById = (
  state: RootState,
  collectionId: string
): ICollectionState["profile"] | undefined =>
  state.globalCollections.globalCollections.find(
    ({ collection }) => collection.id === collectionId
  )?.profile;

// TODO: write a combine selectors which will fork for selectors with arguments
