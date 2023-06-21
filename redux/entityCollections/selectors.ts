import { createDraftSafeSelector } from "@reduxjs/toolkit";

import { ICollectionExtended } from "@/types/entityCollections";

// eslint-disable-next-line import/no-cycle
import { RootState } from "../store";
import { EntityCollectionState } from "./slice";

export const selectRoot = (state: RootState) => state;

export const selectEntityCollections = createDraftSafeSelector(
  selectRoot,
  (state: RootState): EntityCollectionState => state?.entityCollection
);

export const selectCollections = createDraftSafeSelector(
  selectEntityCollections,
  (state: EntityCollectionState): ICollectionExtended[] =>
    state.entityCollections.map(
      (collectionWithEntites) => collectionWithEntites.collection
    )
);

export const selectCollection = createDraftSafeSelector(
  selectEntityCollections,
  (state: EntityCollectionState): ICollectionExtended[] =>
    state.entityCollections.map(
      (collectionWithEntites) => collectionWithEntites.collection
    )
);
export const selectIsEntityCollectionsLoading = createDraftSafeSelector(
  selectEntityCollections,
  (state: EntityCollectionState) => state.isEntityCollectionsLoading
);

export const selectSelectedAssetExternalId = createDraftSafeSelector(
  selectEntityCollections,
  (state: EntityCollectionState) => state.selectedAssetExternalId
);
