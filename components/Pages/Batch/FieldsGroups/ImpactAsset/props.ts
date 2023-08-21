import {
  ICollectionExtended,
  IEntityExtended,
} from "@/types/entityCollections";

export type ImpactAssetProps = {
  entityExternalId?: string;
  entityOwner?: string;
  collectionAssetsAmount?: number;
  entity?: IEntityExtended;
  collection?: ICollectionExtended;
  totalMinted?: number;
  totalTokenAmount?: number;
  totalOffset?: number;
  totalTransfarable?: number;
  retired?: number;
  claimable?: number;
  produced?: number;
};

export default function PagePlug() {
  return null;
}
