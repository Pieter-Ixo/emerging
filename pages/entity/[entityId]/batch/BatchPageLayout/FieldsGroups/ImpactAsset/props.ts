export type ImpactAssetProps = {
  entityExternalId?: string;
  entityIdentifier?: string;
  collectionName?: string;
  collectionImage?: string;
  collectionLogo?: string;
  collectionDenom?: string;
  entityCreated?: string;
  entityTotalMinted?: number | string;
  entityOwner?: string;
  entityName?: string;
  entityDescription?: string;
  entityStartDate?: string;
  collectionProfileDescription?: string;
  collectionProfileName?: string;
  collectionAssetsAmount?: number;
};
export type PortalProps = ImpactAssetProps & { _isVisible: boolean };
