import { ISettingsContext } from "./commonTypes";

export type IAttribute = {
  key: string;
  value: string;
};
export type IProfileSettings = {
  "@context": Array<ISettingsContext | string>;
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
