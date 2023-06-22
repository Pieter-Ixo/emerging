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
