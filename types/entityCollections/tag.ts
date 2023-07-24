import { ISettingsContext } from "./commonTypes";

export type IEntityTags = {
  category: string;
  tags: string[];
};

export type ITagsSettings = {
  "@context": Array<ISettingsContext | string>;
  id: string;
  type: string;
  settings: string;
  entityTags: IEntityTags[];
};
