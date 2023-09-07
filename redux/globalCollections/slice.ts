/* eslint-disable no-param-reassign */
import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import { ICollection, ICollectionProfile } from "@/types/entityCollections";
import { GlobalCollectionsState, ICollectionState } from "./types";
import { getCollectionIndex } from "./helpers";

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
    // TODO: move reducers to ./reducers.ts
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

    setCollectionProfile: (
      state,
      action: PayloadAction<{
        id: ICollection["id"];
        profile: ICollectionProfile;
      }>
    ) => {
      const { id, profile } = action.payload;
      const indexOfCollectionInState = getCollectionIndex(state, id);
      state.globalCollections[indexOfCollectionInState].profile = profile;
    },
    setIsCollectionProfileLoading: (
      state,
      action: PayloadAction<{
        id: ICollection["id"];
        isLoading: ICollectionState["isProfileLoading"];
      }>
    ) => {
      const { id, isLoading } = action.payload;
      const collectionIndex = getCollectionIndex(state, id);
      state.globalCollections[collectionIndex].isProfileLoading = isLoading;
    },
    setCollectionProfileLoadingError: (
      state,
      action: PayloadAction<{
        id: ICollection["id"];
        error: ICollectionState["profileLoadingError"];
      }>
    ) => {
      const { id, error } = action.payload;
      const collectionIndex = getCollectionIndex(state, id);
      state.globalCollections[collectionIndex].profileLoadingError = error;
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

  setCollectionProfile,
  setIsCollectionProfileLoading,
  setCollectionProfileLoadingError,
} = GlobalCollectionsSlice.actions;

export default GlobalCollectionsSlice.reducer;
