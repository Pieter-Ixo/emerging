import {
  ICollectionExtended,
  IEntityExtended,
} from "@/types/entityCollections";

export type ImpactAssetProps = {
  entityExternalId?: string;
  collectionName?: string;
  collectionImage?: string;
  collectionLogo?: string;
  entityTotalMinted?: number | string;
  entityOwner?: string;
  collectionProfileDescription?: string;
  collectionProfileName?: string;
  collectionAssetsAmount?: number;
  entity?: IEntityExtended;
  collection?: ICollectionExtended;
  totalMinted?: number;
  retired?: number;
  claimable?: number;
  produced?: number;
  batchProgress?: number;
};

export default function PagePlug() {
  return null;
}
