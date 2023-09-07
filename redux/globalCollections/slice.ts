/* eslint-disable no-param-reassign */
import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
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

const initialState: GlobalCollectionsState = {
  globalCollections: [],
  isGlobalCollectionsLoading: false,
  globalCollectionsLoadingError: undefined,

  selectedCollection: undefined,
  isSelectedCollectionLoading: false,
  selectedCollectionLoadingError: undefined,
};

const GlobalCollectionsSlice = createSlice({
  name: "globalCollections",
  initialState,
  reducers: {
    setGlobalCollections: (state, action: PayloadAction<ICollection[]>) => {
      const collections = action.payload;
      const collectionsState: ICollectionState[] = collections.map(
        (collection) => ({ collection })
      );
      state.globalCollections = collectionsState;
    },
    setIsGlobalCollectionsLoading: (state, action: PayloadAction<boolean>) => {
      state.isGlobalCollectionsLoading = action.payload;
    },
    setGlobalCollectionsLoadingError: (state, action: PayloadAction<Error>) => {
      state.globalCollectionsLoadingError = action.payload;
    },
  },

  extraReducers: (builder: ActionReducerMapBuilder<GlobalCollectionsState>) => {
    builder.addDefaultCase(() => {});
  },
});

export const {
  setGlobalCollections,
  setIsGlobalCollectionsLoading,
  setGlobalCollectionsLoadingError,
} = GlobalCollectionsSlice.actions;

export default GlobalCollectionsSlice.reducer;
