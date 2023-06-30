import { createAsyncThunk } from "@reduxjs/toolkit";

import getEntityProfile from "@/helpers/getEntityProfile";
import request from "@/requests/request";
import {
  requestBatchByID,
  requestBatches,
  requestBlocksyncAPI,
} from "@/requests/blocksync";
import { IBatch, IBatchDataFilled } from "@/types/certificates";
import { IClaimVer, IClaimIssuer } from "@/types/certificates/claim";

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

      const claimIssuerId = claimVer?.outcome.linkedClaim.issuer;

      if (claimIssuerId) {
        const claimIssuerUri = `/api/entity/byId/${claimIssuerId}`;
        const claimIssuer = await requestBlocksyncAPI<IClaimIssuer>(
          claimIssuerUri
        );
        if (claimIssuer) {
          const claimIssuerProfile = await getEntityProfile(claimIssuer);
          claimIssuer._profile = claimIssuerProfile;
        }
        filledBatch._claimIssuer = claimIssuer;
      }
    }

    return batchesResponse;
  }
);
