import { IEntityExtended } from "../entityCollections";

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

export type Methodology = {
  id: string;
  type: string;
  description: string;
  result?: string;
};

export type Evaluation = {
  id: string;
  type: string;
  methodology: Methodology;
  model: string;
  version: string;
  date: string;
};

export type Evaluator = {
  id: string;
  type: string;
};

export type Location = {
  country: string;
  region: string;
  setting: string;
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

export type Impact = {
  id: string;
  type: string;
  claim: string;
  description: string;
  project: Project;
  location: Location;
};

export type ClaimEvaluation = {
  submitted: number;
  pending: number;
  approved: number;
  rejected: number;
  disputed: number;
};

export type EvidenceProof = {
  digestMultibase: string;
};

export type Evidence = {
  id: string;
  type: string;
  description: string;
  collectionId?: string;
  claimEvaluation?: ClaimEvaluation;
  proof?: EvidenceProof;
};

export type Issuer = {
  id: string;
};

export type IQuantity = {
  type: string[];
  amount: number;
  units: string;
};

export type IResult = {
  type: string;
  amount: number;
  units: string;
};

export type ICalculation = {
  id: string;
  type: string[];
  factor: number;
  quantity: IQuantity;
  result: IResult;
};

export type IConfidence = {
  id: string;
  type: string;
  score: string;
  threshold: string;
  reason: Methodology[];
};

export type ILinkedClaim = {
  id: string;
  type: string;
  description: string;
  issuanceDate: string;
  issuer: string;
  digestMultibase: string;
};

export type IPeriod = {
  startDate: string;
  endDate: string;
};

export type IClimeVerProof = {
  type: string;
  created: string;
  verificationMethod: string;
  proofPurpose: string;
  jws: string;
};

export type IOutcome = {
  linkedClaim: ILinkedClaim;
  period: IPeriod;
  calculation: ICalculation;
  confidence: IConfidence[];
};

export type CredentialSubject = {
  id: string;
  type: string[];
  impact: Impact;
  evaluation: Evaluation;
  evaluator: Evaluator;
};

export type IClaimVer = {
  "@context": [string, ContextClass];
  id: string;
  type: string[];
  validFrom: string;
  status: string;
  credentialSubject: CredentialSubject;
  outcome: IOutcome;
  evidence: Evidence[];
  issuer: Issuer;
  issuanceDate: string;
  proof: IClimeVerProof;
};

export type IClaimIssuer = IEntityExtended;
