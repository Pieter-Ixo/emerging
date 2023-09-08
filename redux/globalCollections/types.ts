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
  profileError?: Error | undefined;

  tags?: ICollectionTags;
  isTagsLoading?: boolean;
  tagsError?: Error | undefined;

  tokenIpfs?: ICollectionTokenIpfs;
  isTokenIpfsLoading?: boolean;
  tokenIpfsError?: Error | undefined;
};

export type GlobalCollectionsState = {
  globalCollections: ICollectionState[];
  isGlobalCollectionsLoading: boolean;
  globalCollectionsError: Error | undefined;

  selectedCollection: ICollectionState | undefined;
  isSelectedCollectionLoading: boolean;
  selectedCollectionError: Error | undefined;
};
