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

export type Quantity = {
  type: string[];
  amount: number;
  units: string;
};

export type Result = {
  type: string;
  amount: number;
  units: string;
};

export type Calculation = {
  id: string;
  type: string[];
  factor: number;
  quantity: Quantity;
  result: Result;
};

export type Confidence = {
  id: string;
  type: string;
  score: string;
  threshold: string;
  reason: Methodology[];
};

export type LinkedClaim = {
  id: string;
  type: string;
  description: string;
  issuanceDate: string;
  issuer: string;
  digestMultibase: string;
};

export type Period = {
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

export type Outcome = {
  linkedClaim: LinkedClaim;
  period: Period;
  calculation: Calculation;
  confidence: Confidence[];
};

export type CredentialSubject = {
  id: string;
  type: string[];
  impact: Impact;
  evaluation: Evaluation;
  evaluator: Evaluator;
};

export type IClaimVer = {
  "@context": Array<ContextClass | string>;
  id: string;
  type: string[];
  validFrom: string;
  status: string;
  credentialSubject: CredentialSubject;
  outcome: Outcome;
  evidence: Evidence[];
  issuer: Issuer;
  issuanceDate: string;
  proof: IClimeVerProof;
};
