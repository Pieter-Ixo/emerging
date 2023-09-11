import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  requestBatchByID,
  requestBatchesByAddress,
  requestEntityByExternalID,
} from "@/requests/blocksync";
import requestClaimCerFilled from "@/requests/requesters/requestClaimCer";
import requestClaimIssuerFilled from "@/requests/requesters/requestClaimIssuer";
import requestClaimVer from "@/requests/requesters/requestClaimVer";
import { requestEntityWithProfile } from "@/requests/requesters/requestEntityProfile";
import requestVerifiableCredential from "@/requests/requesters/requestVerifiableCredential";
import {
  IAddressBatchResponse,
  IBatch,
  IBatchDataFilled,
} from "@/types/certificates";
import isURL from "@/utils/isStrUrl";

import getEntityAdmin from "@/helpers/transformData/getEntityAdmin";
import { requestTokenByAddress } from "@/requests/requesters/requestEntityToken";
import filterCarbonTokens from "@/helpers/batches/filterCarbonTokens";

export const fetchBatchesByAdminAddress = createAsyncThunk<
  IAddressBatchResponse,
  string
>(
  "batches/fetchBatchesByAdminAddress",
  async (adminAddress: string): Promise<IAddressBatchResponse> => {
    const batchesResponse = await requestBatchesByAddress(adminAddress);
    if (!batchesResponse) throw new Error("panica!");

    return batchesResponse;
  }
);

export const fetchBatchById = createAsyncThunk<IBatch, string>(
  "batches/fetchBatchById",
  async (batchId: string): Promise<IBatchDataFilled> => {
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

export const fetchAndFilterAdminOwnerBatches = createAsyncThunk(
  "entityCollections/fetchAndFilterAdminOwnerBatches",
  async ({
    externalId,
    ownerAddress,
  }: {
    externalId: string;
    ownerAddress: string;
  }): Promise<any> => {
    const entity = await requestEntityByExternalID(externalId);

    const entityAdminAddress = getEntityAdmin(entity);

    if (!entityAdminAddress) return undefined;

    const adminEntityBatchesRes = await requestTokenByAddress(
      entityAdminAddress
    );
    const ownerAddressBatchesRes = await requestTokenByAddress(ownerAddress);

    const adminEntityBathesMap = adminEntityBatchesRes.CARBON.tokens;
    const ownerAddressBatchesMap = ownerAddressBatchesRes.CARBON.tokens;

    const adminFilteredEntityBatches = filterCarbonTokens(
      adminEntityBathesMap,
      ownerAddressBatchesMap
    );

    const userFilteredEntityBatches = filterCarbonTokens(
      ownerAddressBatchesMap,
      adminEntityBathesMap
    );

    return {
      ownerFilteredBatches: userFilteredEntityBatches,
      adminFilteredBatches: adminFilteredEntityBatches,
      ownerAddress: entity.owner,
    };
  }
);
