export type ISettingsContext = {
  ixo: string;
  web3: string;
  id: string;
  type: string;
  "@protected": boolean;
};

export type IMetadata = {
  versionId: string;
  created: Date;
  updated: Date;
  deactivated: boolean;
};
