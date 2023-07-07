import { ISettingsContext } from "./commonTypes";

export type IAttribute = {
  key: string | "Model" | "Fuel";
  value: string;
};
export type IProfileSettings = {
  "@context": Array<ISettingsContext | string>;
  id: string;
  type: string;
  name: string;
  image: string;
  logo: string;
  imageUrl: string;
  logoUrl: string;
  brand: string;
  location: string;
  description: string;
  attributes: IAttribute[];
  metrics: unknown[];
};
