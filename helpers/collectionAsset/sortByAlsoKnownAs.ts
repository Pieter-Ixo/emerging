import { IEntityExtended } from "@/types/entityCollections";

export const sortByAlsoKnownAsAscending = (entities: IEntityExtended[]) =>
  entities
    ?.slice()
    .sort(
      (a, b) =>
        parseInt(a.alsoKnownAs.split(`#`)[1], 10) -
        parseInt(b.alsoKnownAs.split(`#`)[1], 10)
    );

export const sortByAlsoKnownAsDescending = (entities: IEntityExtended[]) =>
  entities
    ?.slice()
    .sort(
      (a, b) =>
        parseInt(b.alsoKnownAs.split(`#`)[1], 10) -
        parseInt(a.alsoKnownAs.split(`#`)[1], 10)
    );
