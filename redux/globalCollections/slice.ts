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
import { GlobalCollectionsState, ICollectionState } from "./types";
import { getCollectionIndex } from "./helpers";

const initialCollectionState: Omit<ICollectionState, "collection"> = {
  profile: undefined,
  isProfileLoading: false,
  profileError: undefined,
  tags: undefined,
  isTagsLoading: false,
  tagsError: undefined,
  tokenIpfs: undefined,
  isTokenIpfsLoading: false,
  tokenIpfsError: undefined,
};


const initialState: GlobalCollectionsState = {
  globalCollections: [],
  isGlobalCollectionsLoading: false,
  globalCollectionsError: undefined,

  selectedCollection: undefined,
  isSelectedCollectionLoading: false,
  selectedCollectionError: undefined,
};

const GlobalCollectionsSlice = createSlice({
  name: "GlobalCollectionsSlice",
  initialState,
  reducers: {
    setGlobalCollections: (state, action: PayloadAction<ICollection[]>) => {
      const collections = action.payload;
      const isStateEmpty = !state.globalCollections.length;

      if (isStateEmpty) {
        state.globalCollections = collections.map(
          (collection): ICollectionState => ({
            collection,
            ...initialCollectionState,
          })
        );
      } else {
        collections.forEach((collection) => {
          const index = getCollectionIndex(state, collection.id);
          if (index === -1)
            state.globalCollections.push({
              collection,
              ...initialCollectionState,
            });
          else state.globalCollections[index].collection = collection;
        });
      }
    },
    setIsGlobalCollectionsLoading: (state, action: PayloadAction<boolean>) => {
      state.isGlobalCollectionsLoading = action.payload;
    },
    setGlobalCollectionsError: (state, action: PayloadAction<Error>) => {
      state.globalCollectionsError = action.payload;
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
    setCollectionProfileError: (
      state,
      action: PayloadAction<{
        id: ICollection["id"];
        error: ICollectionState["profileError"];
      }>
    ) => {
      const { id, error } = action.payload;
      const collectionIndex = getCollectionIndex(state, id);
      state.globalCollections[collectionIndex].profileError = error;

    },

    setCollectionTags: (
      state,
      action: PayloadAction<{
        id: ICollection["id"];
        tags: ICollectionTags;
      }>
    ) => {
      const { id, tags } = action.payload;
      const indexOfCollectionInState = getCollectionIndex(state, id);
      state.globalCollections[indexOfCollectionInState].tags = tags;
    },
    setIsCollectionTagsLoading: (
      state,
      action: PayloadAction<{
        id: ICollection["id"];
        isLoading: ICollectionState["isTagsLoading"];
      }>
    ) => {
      const { id, isLoading } = action.payload;
      const collectionIndex = getCollectionIndex(state, id);
      state.globalCollections[collectionIndex].isTagsLoading = isLoading;
    },
    setCollectionTagsError: (
      state,
      action: PayloadAction<{
        id: ICollection["id"];
        error: ICollectionState["tagsError"];
      }>
    ) => {
      const { id, error } = action.payload;
      const collectionIndex = getCollectionIndex(state, id);
      state.globalCollections[collectionIndex].tagsError = error;
    },
    setCollectionTokenIpfs: (
      state,
      action: PayloadAction<{
        id: ICollection["id"];
        tokenIpfs: ICollectionTokenIpfs;
      }>
    ) => {
      const { id, tokenIpfs } = action.payload;
      const indexOfCollectionInState = getCollectionIndex(state, id);
      state.globalCollections[indexOfCollectionInState].tokenIpfs = tokenIpfs;
    },
    setIsCollectionTokenIpfsLoading: (
      state,
      action: PayloadAction<{
        id: ICollection["id"];
        isLoading: ICollectionState["isTokenIpfsLoading"];
      }>
    ) => {
      const { id, isLoading } = action.payload;
      const collectionIndex = getCollectionIndex(state, id);
      state.globalCollections[collectionIndex].isTokenIpfsLoading = isLoading;
    },
    setCollectionTokenIpfsError: (
      state,
      action: PayloadAction<{
        id: ICollection["id"];
        error: ICollectionState["tokenIpfsError"];
      }>
    ) => {
      const { id, error } = action.payload;
      const collectionIndex = getCollectionIndex(state, id);
      state.globalCollections[collectionIndex].tokenIpfsError = error;
    },
  },
});

export const {
  setGlobalCollections,
  setIsGlobalCollectionsLoading,
  setGlobalCollectionsError,

  setCollectionProfile,
  setIsCollectionProfileLoading,
  setCollectionProfileError,

  setCollectionTags,
  setIsCollectionTagsLoading,
  setCollectionTagsError,

  setCollectionTokenIpfs,
  setIsCollectionTokenIpfsLoading,
  setCollectionTokenIpfsError,

} = GlobalCollectionsSlice.actions;

export default GlobalCollectionsSlice.reducer;
