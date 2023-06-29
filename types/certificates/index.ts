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

type ITokenBalance = unknown;

export type IBatchDataFilled = IBatch & {
  _impactAsset?: IImpactAssetData;
  _tokenBalance?: ITokenBalance;
};
