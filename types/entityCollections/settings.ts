export type IContext = {
  ixo: string;
  web3: string;
  id: string;
  type: string;
  "@protected": boolean;
};

export type IAttribute = {
  key: string;
  value: string;
};
export type ISetting = {
  "@context": Array<IContext | string>;
  id: string;
  type: string;
  name: string;
  image: string;
  logo: string;
  brand: string;
  location: string;
  description: string;
  attributes: IAttribute[];
  metrics: unknown[];
};
