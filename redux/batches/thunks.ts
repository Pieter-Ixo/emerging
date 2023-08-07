import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  requestBatches,
  requestBatchByID,
  requestBatchesByAddress,
} from "@/requests/blocksync";
import requestClaimCerFilled from "@/requests/requesters/requestClaimCer";
import requestClaimIssuerFilled from "@/requests/requesters/requestClaimIssuer";
import requestClaimVer from "@/requests/requesters/requestClaimVer";
import { requestEntityWithProfile } from "@/requests/requesters/requestEntityProfile";
import requestVerifiableCredential from "@/requests/requesters/requestVerifiableCredential";
import { IAddressBatchResponse, IBatch, IBatchDataFilled } from "@/types/certificates";
import isURL from "@/utils/isStrUrl";

// eslint-disable-next-line import/no-cycle
import { AppDispatch } from "../store";
import { fetchAndFillCollections } from "../entityCollections/thunks";

export const fetchAllBatches = createAsyncThunk<
  IBatch[],
  void,
  { dispatch: AppDispatch }
>("batches/fetchAllBatches", async (_, { dispatch }): Promise<IBatch[]> => {
  await dispatch(fetchAndFillCollections());
  const batchesResponse = await requestBatches();
  if (!batchesResponse) throw new Error("panica!");

  return batchesResponse;
});

export const fetchBatchesForEntity = createAsyncThunk<
  IBatch[],
  string,
  { dispatch: AppDispatch }
>(
  "batches/fetchBatchesForEntity",
  async (externalId: string, { dispatch }): Promise<IBatch[]> => {
    const batchesResponse = await requestBatches();
    if (!batchesResponse) throw new Error("panica!");

    return batchesResponse;
  }
);
export const fetchBatchesByAddress = createAsyncThunk<
  IAddressBatchResponse,
  string,
  { dispatch: AppDispatch }
>(
  "batches/fetchBatchesByAddress",
  async (adminAddress: string, { dispatch }): Promise<IAddressBatchResponse> => {
    const batchesResponse = await requestBatchesByAddress(adminAddress);

    if (!batchesResponse)
      throw new Error("panica!");
      
    return batchesResponse;
  }
);

export const fetchBatchById = createAsyncThunk<
  IBatch,
  string,
  { dispatch: AppDispatch }
>(
  "batches/fetchBatchById",
  async (batchId: string, { dispatch }): Promise<IBatchDataFilled> => {
    const batchesResponse = await requestBatchByID(batchId);
    if (!batchesResponse) throw new Error("!batchesResponse");
    const filledBatch: IBatchDataFilled = batchesResponse;

    const claimVerUri = batchesResponse.tokenData[0].uri;

    if (isURL(claimVerUri)) {
      const claimVer = await requestClaimVer(batchesResponse.tokenData[0].uri);
      filledBatch._claimVer = claimVer;

      if (claimVer) {
        const [claimCer, claimIssuer, verifiableCredential, protocol, oracle] =
          await Promise.all([
            await requestClaimCerFilled(claimVer),
            await requestClaimIssuerFilled(
              claimVer?.outcome.linkedClaim.issuer
            ),
            await requestVerifiableCredential(claimVer),
            await requestEntityWithProfile(claimVer["@context"][1].protocol),
            await requestEntityWithProfile(claimVer.issuer.id),
          ]);

        filledBatch._claimIssuer = claimIssuer;
        filledBatch._claimCer = claimCer;
        filledBatch._verifiableCred = verifiableCredential;
        filledBatch._protocol = protocol;
        filledBatch._oracle = oracle;
      }
    }

    return filledBatch;
  }
);
