import { IEntityExtended } from "../entityCollections";
import { IClaimCer } from "./claimCer";
import { IClaimIssuer, IClaimVer } from "./claimVer";
import { IVerifiableCred } from "./verifiableCred";

export type ITokenData = {
  aid: number;
  uri: string;
  encrypted: boolean;
  proof: string;
  type: string;
  id: string;
  tokenId: string;
};

export type IBatch = {
  id: string;
  index: string;
  name: string;
  collection: string;
  tokenData: ITokenData[];
};

export type IAddressBatches = {
  [key: string]: {
    amount: number;
    collection: string;
    minted: number;
    retired: number;
  };
};

export type IAddressBatchResponse = {
  CARBON: {
    contractAddress: string;
    description: string;
    image: string;
    tokens: IAddressBatches;
  };
};

type IAddressBatchData = {
  amount: number;
  collection: string;
  minted: number;
  retired: number;
};

export type IAddressBatchesEntry = [string, IAddressBatchData];

export type Batches = IBatch[];

export type IImpactAssetData = {
  identifier?: string;
  collection?: string;
  denom?: string;
  "creation date"?: string;
  "total CARBON produced"?: string;
  "total emissions avoided"?: string;
  "owned by"?: string;
  performance?: string;
};

export type ITokenBalance = unknown;

export type IBatchDataFilled = IBatch & {
  _impactAsset?: IImpactAssetData;
  _tokenBalance?: ITokenBalance;
  _claimVer?: IClaimVer;
  _verifiableCred?: IVerifiableCred;
  _claimIssuer?: IClaimIssuer;
  _claimCer?: IClaimCer;
  _protocol?: IEntityExtended;
  _oracle?: IEntityExtended;
};
