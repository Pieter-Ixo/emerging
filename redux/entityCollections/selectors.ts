import { createDraftSafeSelector } from "@reduxjs/toolkit";

import {
  ICollectionEntities,
  ICollectionExtended,
  IEntity,
  ITokenOfTokenCarbon,
} from "@/types/entityCollections";

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

export const selectUserEntityCollections = createDraftSafeSelector(
  selectEntityCollections,
  (state: EntityCollectionState): ICollectionEntities[] =>
    state.userEntityCollections
);

export const selectUserEntitiesLength = createDraftSafeSelector(
  selectEntityCollections,
  (state: EntityCollectionState): number =>
    state.userEntityCollections.reduce(
      (acc, { entities }) => acc + entities.length,
      0
    )
);

export const selectUserEntitiesTotal = createDraftSafeSelector(
  selectEntityCollections,
  (state: EntityCollectionState): EntityCollectionState["userTokens"] =>
    state.userTokens
);

export const selectEntitiesAdminTotal = createDraftSafeSelector(
  selectEntityCollections,
  (state: EntityCollectionState): number => {
    const collecitonsAmount = state.userEntityCollections.reduce(
      (collectionAcc, { entities }) => {
        const entitiesAmount = entities.reduce((entityAcc, entity) => {
          const tokens = entity._adminToken?.CARBON._totalMinted?.tokens;
          if (!tokens) return entityAcc;

          const tokenAmount = Object.values(tokens)[0].amount;

          return entityAcc + (tokenAmount || 0);
        }, 0);
        return collectionAcc + entitiesAmount;
      },
      0
    );

    return collecitonsAmount;
  }
);

export const selectUserEntitiesTotalAmount = createDraftSafeSelector(
  selectEntityCollections,
  (state: EntityCollectionState): ITokenOfTokenCarbon | undefined => {
    const totalTokensMap = state.userTokens?.CARBON._totalMinted?.tokens;
    if (!totalTokensMap) return undefined;
    const token = Object.values(totalTokensMap)?.[0] || {};
    return token;
  }
);

export const selectUserEntitiesTotalLoading = createDraftSafeSelector(
  selectEntityCollections,
  (
    state: EntityCollectionState
  ): EntityCollectionState["isUserTokensLoading"] => state.isUserTokensLoading
);

export const selectCollectionAssetsCount = createDraftSafeSelector(
  selectEntityCollections,
  (state: EntityCollectionState): number =>
    state?.entityCollections[0]?.entities.length
);
export const selectOnlyCollection = createDraftSafeSelector(
  selectEntityCollections,
  (state: EntityCollectionState): ICollectionExtended =>
    state.entityCollections[0]?.collection
);

export const selectIsEntityCollectionsLoading = createDraftSafeSelector(
  selectEntityCollections,
  (state: EntityCollectionState) => state.isEntityCollectionsLoading
);

export const selectSelectedAssetExternalId = createDraftSafeSelector(
  selectEntityCollections,
  (state: EntityCollectionState) => state.selectedEntity?.externalId
);

export const selectSelectedEntity = createDraftSafeSelector(
  selectEntityCollections,
  (state: EntityCollectionState) => state.selectedEntity
);

export const selectAllEntities = createDraftSafeSelector(
  selectEntityCollections,
  (entityCollectionsState: EntityCollectionState) =>
    entityCollectionsState.entityCollections?.[0]?.entities
);

export const selectEntityByExternalId = (
  state: RootState,
  externalId: IEntity["externalId"]
): IEntity | undefined => {
  const entities = selectAllEntities(state);
  return entities?.find((entity) => entity.externalId === externalId);
};
