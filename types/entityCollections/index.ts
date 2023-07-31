/**
 * THESE types were generated using https://app.quicktype.io/
 * FROM data by this url: https://devnet-blocksync.ixo.earth/api/entity/collections
 * 2023, June 15
 */

import { IMetadata } from "./commonTypes";
import { IProfileSettings } from "./settings";
import { ITagsSettings } from "./tag";
import { IDeviceCredentials } from "./deviceCredentials";
import { ISupamoto, ISupamotoCookingSumary } from "../supamoto";

export type IAccordedRight = {
  aid: number;
  type: string;
  id: string;
  mechanism: string;
  message: string;
  service: string;
  iid: string;
};

export type IAccount = {
  name: string | "admin";
  address: string;
};

export type ICollectionContext = {
  aid: number;
  key: string;
  val: string;
  iid: string;
};

export type ILinkedEntity = {
  aid: number;
  type: string;
  id: string;
  relationship: string;
  service: string;
  iid: string;
};

export type ILinkedResource = {
  aid: number;
  type: string;
  id: string;
  description: string;
  mediaType: string;
  serviceEndpoint: string;
  proof: string;
  encrypted: string;
  right: string;
  iid: string;
};

export type IService = {
  aid: number;
  id: string;
  type: string;
  serviceEndpoint: string;
  iid: string;
};

export type ISettings = {
  Page: ILinkedResource;
  Tags: ILinkedResource;
  Profile: ILinkedResource;
};

export type IVerificationMethod = {
  id: string;
  type: string;
  controller: string;
  publicKeyBase58?: string;
  publicKeyMultibase?: string;
  blockchainAccountID?: string;
};

export type ICollection = {
  id: string;
  type: string;
  startDate: Date;
  endDate: null;
  status: number;
  relayerNode: string;
  credentials: unknown[];
  entityVerified: boolean;
  metadata: IMetadata;
  accounts: IAccount[];
  externalId: null;
  owner: string;
  controller: string[];
  verificationMethod: IVerificationMethod[];
  authentication: string[];
  assertionMethod: unknown[];
  keyAgreement: unknown[];
  capabilityInvocation: unknown[];
  capabilityDelegation: unknown[];
  alsoKnownAs: string;
  context: ICollectionContext[];
  accordedRight: IAccordedRight[];
  linkedEntity: ILinkedEntity[];
  linkedResource: ILinkedResource[];
  service: IService[];
  settings: ISettings;
};
export type IEntity = {
  id: string;
  type: string;
  startDate: string;
  endDate: null;
  status: number;
  relayerNode: string;
  credentials: unknown[];
  entityVerified: boolean;
  metadata: IMetadata;
  accounts: IAccount[];
  externalId: string;
  owner: string;
  controller: string[];
  verificationMethod: IVerificationMethod[];
  authentication: string[];
  assertionMethod: unknown[];
  keyAgreement: unknown[];
  capabilityInvocation: unknown[];
  capabilityDelegation: unknown[];
  alsoKnownAs: string;
  context: ICollectionContext[];
  accordedRight: IAccordedRight[];
  linkedEntity: ILinkedEntity[];
  linkedResource: ILinkedResource[];
  service: IService[];
  settings: ISettings;
};

export type IEntityProfile = IProfileSettings;

export type ICollectionProfile = IProfileSettings & {
  imageUrl?: string;
  logoUrl?: string;
};
export type ICollectionTags = ITagsSettings & {};

export type ICollectionTokenIpfs = {
  id: string;
  type: string;
  name: string;
  tokenName: string;
  decimals: number;
  description: string;
  image: string;
  properties: {
    denom: string;
    icon: string;
    maxSupply: string;
  };
};

export type ICollectionExtended = ICollection & {
  _profile?: ICollectionProfile;
  _tags?: ICollectionTags;
  _tokenIpfs?: ICollectionTokenIpfs;
};

export type ITokenOfTokenCarbon = {
  collection: string;
  amount: number;
  minted: number;
  retired: number;
};

export type ITokenCarbon = {
  contractAddress: string;
  description: string;
  image: string;
  tokens: { [key: string]: ITokenOfTokenCarbon };
};

export type ITokenCarbonExtended = ITokenCarbon & {
  _totalMinted?: ITokenCarbon;
};

export type ITokenWhateverItMean = {
  CARBON: ITokenCarbonExtended;
};

export type IEntityExtended = IEntity & {
  _profile?: IEntityProfile;
  _adminToken?: ITokenWhateverItMean;
  _deviceCredential?: IDeviceCredentials;
  _supamoto?: ISupamoto;
  _supamotoCookingSummary?: ISupamotoCookingSumary;
  _tags?: ICollectionTags;
};

export type ICollectionEntities = {
  collection: ICollectionExtended;
  entities: IEntityExtended[];
};

export type IApiEntityCollectionsResponse = ICollectionEntities[];

export interface ICollectionEntitiesToken {
  amount: number;
  minted: number;
  retired?: number;
}

interface ITokenDetails {
  contractAddress: string;
  description: string;
  image: string;
  tokens: {
    [entityId: string]: ICollectionEntitiesToken;
  };
}

export interface IApiCollectionEntitiesTotal {
  entity?: string;
  tokens?: {
    CARBON: ITokenDetails;
  };
}

export interface IApiCollectionEntitiesTotalRetired {
  contractAddress: string;
  minter: string;
  class: string;
  name: string;
  description: string;
  image: string;
  type: string;
  cap: string;
  supply: string;
  paused: boolean;
  stopped: boolean;
  retired: {
    aid: number;
    id: string;
    reason: string;
    jurisdiction: string;
    amount: string;
    owner: string;
    name: string;
  }[];
  cancelled: any[];
}

export interface IApiCollectionEntitiesTotalExtended {
  totalEntities: IApiCollectionEntitiesTotal;
  totalRetired: IApiCollectionEntitiesTotalRetired;
}
