/**
 * THESE types were generated using https://app.quicktype.io/
 * FROM data by this url: https://devnet-blocksync.ixo.earth/api/entity/collections
 * 2023, June 15
 */

import { ISetting } from "./settings";

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
  name: string;
  address: string;
};

export type IContext = {
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

export type IMetadata = {
  versionId: string;
  created: Date;
  updated: Date;
  deactivated: boolean;
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
  context: IContext[];
  accordedRight: IAccordedRight[];
  linkedEntity: ILinkedEntity[];
  linkedResource: ILinkedResource[];
  service: IService[];
  settings: ISettings;
};

export type IEntity = {
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
  context: IContext[];
  accordedRight: IAccordedRight[];
  linkedEntity: ILinkedEntity[];
  linkedResource: ILinkedResource[];
  service: IService[];
  settings: ISettings;
};

export type ICollectionProfile = ISetting & {
  imageUrl?: string;
  logoUrl?: string;
};

export type ICollectionExtended = ICollection & {
  _profile?: ICollectionProfile;
};

export type ICollectionEntities = {
  collection: ICollectionExtended;
  entities: IEntity[];
};

export type IApiEntityCollectionsResponse = ICollectionEntities[];
