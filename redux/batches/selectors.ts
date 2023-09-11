import { createDraftSafeSelector } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { selectRoot } from "../selectors";
import { IBatchesState } from "./slice";

export const selectBatchesState = createDraftSafeSelector(
  selectRoot,
  (state: RootState): IBatchesState => state?.batches
);

export const selectAdminAddressBatches = createDraftSafeSelector(
  selectBatchesState,
  (batchesState: IBatchesState): IBatchesState["adminBatches"] | undefined =>
    batchesState.adminBatches
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

export const selectAdminBatchesFiltered = createDraftSafeSelector(
  selectBatchesState,
  (batchesState: IBatchesState): IBatchesState["adminBatchesFiltered"] => {
    const batches = batchesState.adminBatchesFiltered;

    if (!batches) return undefined;

    return batches;
  }
);

export const selectOwnerFilteredBatches = createDraftSafeSelector(
  selectBatchesState,
  (batchesState: IBatchesState): IBatchesState["ownerFilteredBatches"] => {
    const batches = batchesState.ownerFilteredBatches;

    if (!batches) return undefined;

    return batches;
  }
);
export const selectOwnerAddress = createDraftSafeSelector(
  selectBatchesState,
  (batchesState: IBatchesState): IBatchesState["ownerAddress"] => {
    const ownerAddress = batchesState.ownerAddress;

    if (!ownerAddress) return undefined;

    return ownerAddress;
  }
);
