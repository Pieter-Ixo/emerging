export type ContextClass = {
  ixo: string;
  claim: string;
  protocol: string;
  web3: string;
  cellnode: string;
  type: string;
  "@protected": boolean;
  "@version": number;
};

export type LinkedClaim = {
  id: string;
  type: string[];
  digestMultibase: string;
};
export type Evidence = {
  linkedClaim: LinkedClaim;
};

export type Impact = {
  id: string;
  type: string;
};

export type Location = {
  country: string;
  region: string;
  setting: string;
};

export type Quantity = {
  amount: number;
  units: string;
};

export type Measure = {
  id: string;
  type: string[];
  quantity: Quantity;
};
export type Period = {
  startDate: string;
  endDate: string;
};

export type Credential = {
  id: string;
  type: string[];
  issuer: string;
  proof: string;
};
export type Project = {
  id: string;
  type: string;
  credential: Credential;
};

export type Issuer = {
  id: string;
};

export type Proof = {
  type: string;
  created: string;
  verificationMethod: string;
  proofPurpose: string;
  jws: string;
};
export type IClaim = {
  id: string;
  type: string;
  impact: Impact;
  project: Project;
  location: Location;
  period: Period;
  measure: Measure;
  evidence: Evidence[];
};

export type CredentialSubject = {
  id: string;
  type: string[];
  claim: IClaim;
};

export type IClaimCer = {
  "@context": Array<ContextClass | string>;
  id: string;
  type: string[];
  credentialSubject: CredentialSubject;
  issuer: Issuer;
  issuanceDate: string;
  proof: Proof;
};
