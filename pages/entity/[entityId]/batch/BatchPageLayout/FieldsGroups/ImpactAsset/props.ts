import {
  ICollectionExtended,
  IEntityExtended,
} from "@/types/entityCollections";

export type ImpactAssetProps = {
  entityExternalId?: string;
  collectionName?: string;
  collectionImage?: string;
  collectionLogo?: string;
  collectionDenom?: string;
  entityCreated?: string;
  entityTotalMinted?: number | string;
  entityOwner?: string;
  collectionProfileDescription?: string;
  collectionProfileName?: string;
  collectionAssetsAmount?: number;
  entity?: IEntityExtended;
  collection?: ICollectionExtended;
};

export default function PagePlug() {
  return null;
}
