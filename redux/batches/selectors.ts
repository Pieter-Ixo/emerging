import { createDraftSafeSelector } from "@reduxjs/toolkit";

import { IEntity } from "@/types/entityCollections";

import { RootState } from "../store";
import { selectRoot } from "../selectors";
import { selectEntityByExternalId } from "../entityCollections/selectors";
import { IBatchesState } from "./slice";

export const selectBatchesState = createDraftSafeSelector(
  selectRoot,
  (state: RootState): IBatchesState => state?.batches
);

export const selectAllBatches = createDraftSafeSelector(
  selectBatchesState,
  (batchesState: IBatchesState): IBatchesState["batches"] | undefined =>
    batchesState.batches
);

export const selectSelectedBatch = createDraftSafeSelector(
  selectBatchesState,
  (
    batchesState: IBatchesState
  ): IBatchesState["selectedBatchData"] | undefined =>
    batchesState.selectedBatchData
);

export const selectIsBatchesLoading = createDraftSafeSelector(
  selectBatchesState,
  (batchesState: IBatchesState): IBatchesState["isBatchesLoading"] =>
    batchesState.isBatchesLoading
);

export const selectBatchesForEntity =
  (externalId: IEntity["externalId"]) => (state: RootState) => {
    const batches = selectAllBatches(state);
    const entity = selectEntityByExternalId(state, externalId);

    if (!entity) return undefined;

    const filteredBatches = batches?.filter(
      (batch) => entity.id === batch?.tokenData?.[0]?.id
    );

    return filteredBatches;
  };
