export enum ID {
  VocabCO2Emission = "vocab:CO2Emission",
  VocabEnergy = "vocab:Energy",
  VocabQuantitativeValue = "vocab:QuantitativeValue",
}

export enum Type {
  CO2Emission = "CO2Emission",
  Energy = "Energy",
  QuantitativeValue = "QuantitativeValue",
}

export type ContextClass = {
  "@version": number;
  "@protected": boolean;
  type: string;
  vocab: string;
};

export type CredentialSubject = {
  id: string;
};

export type Datum = {
  value: string;
  units: string;
  id: ID;
  type: Type;
  description: string;
};

export type Proof = {
  type: string;
  created: string;
  verificationMethod: string;
  proofPurpose: string;
  jws: string;
};

export type IVerifiableCred = {
  "@context": Array<ContextClass | string>;
  id: string;
  type: string[];
  credentialSubject: CredentialSubject;
  data: { [key: string]: Datum }[];
  issuer: CredentialSubject;
  issuanceDate: string;
  proof: Proof;
};
