export type ContextClass = {
  "@version": number;
  "@protected": boolean;
  type: string;
};

export type Certification = {
  id: string;
  type: string;
  issuer: string;
  date: string;
  code: string;
};

export type Manufacturer = {
  name: string;
  country: string;
  date: string;
};

export type Product = {
  model: string;
  description: string;
  color: string;
};

export type Issuer = {
  id: string;
};

export type Proof = {
  type: string;
  created: Date;
  verificationMethod: string;
  proofPurpose: string;
  jws: string;
};

export type CredentialSubject = {
  id: string;
  product: Product;
  manufacturer: Manufacturer;
  certification: Certification;
};

export type IDeviceCredentials = {
  "@context": Array<ContextClass | string>;
  id: string;
  type: string[];
  credentialSubject: CredentialSubject;
  issuer: Issuer;
  issuanceDate: Date;
  proof: Proof;
};
