import { createAsyncThunk } from "@reduxjs/toolkit";

import getClaimCer from "@/helpers/getClaimCer";
import getClaimIssuer from "@/helpers/getClaimIssuer";
import { getEntityWithProfile } from "@/helpers/getEntityProfile";
import getVerifiableCredential from "@/helpers/getVerifiableCredential";
import request from "@/requests/request";
import { requestBatchByID, requestBatches } from "@/requests/blocksync";
import { IBatch, IBatchDataFilled } from "@/types/certificates";
import { IClaimVer } from "@/types/certificates/claimVer";

import isURL from "@/utils/isStrUrl";

// eslint-disable-next-line import/no-cycle
import { AppDispatch } from "../store";
import { fetchAndFillCollections } from "../entityCollections/thunks";

// eslint-disable-next-line import/prefer-default-export
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
      const claimVer = await request<IClaimVer>(
        batchesResponse.tokenData[0].uri
      );
      filledBatch._claimVer = claimVer;

      if (claimVer) {
        const [claimCer, claimIssuer, verifiableCredential, protocol] =
          await Promise.all([
            await getClaimCer(claimVer),
            await getClaimIssuer(claimVer?.outcome.linkedClaim.issuer),
            await getVerifiableCredential(claimVer),
            await getEntityWithProfile(claimVer["@context"][1].protocol),
          ]);

        filledBatch._claimIssuer = claimIssuer;
        filledBatch._claimCer = claimCer;
        filledBatch._verifiableCred = verifiableCredential;
        filledBatch._protocol = protocol;
      }
    }

    return filledBatch;
  }
);
