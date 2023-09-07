import {
  ICollection,
  ICollectionProfile,
  ICollectionTags,
  ICollectionTokenIpfs,
} from "@/types/entityCollections";

export type ICollectionState = {
  collection: ICollection;

  profile?: ICollectionProfile;
  isProfileLoading?: boolean;
  profileLoadingError?: Error | undefined;

  tags?: ICollectionTags;
  isTagsLoading?: boolean;
  tagsLoadingError?: Error | undefined;

  tokenIpfs?: ICollectionTokenIpfs;
  isTokenIpfsLoading?: boolean;
  tokenIpfsLoadingError?: Error | undefined;
};

export type GlobalCollectionsState = {
  globalCollections: ICollectionState[];
  isGlobalCollectionsLoading: boolean;
  globalCollectionsLoadingError: Error | undefined;

  selectedCollection: ICollectionState | undefined;
  isSelectedCollectionLoading: boolean;
  selectedCollectionLoadingError: Error | undefined;
};
