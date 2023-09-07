import { createDraftSafeSelector } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { GlobalCollectionsState } from "./slice";

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
