/* eslint-disable no-param-reassign */

import { requestGlobalCollections } from "@/requests/blocksync-v2";

import type { AppThunk } from "../store";
import {
  setGlobalCollections,
  setGlobalCollectionsLoadingError,
  setIsGlobalCollectionsLoading,
} from "./slice";

export const fetchGlobalCollections =
  (): AppThunk => async (dispatch, getState) => {
    const state = getState();

    dispatch(setIsGlobalCollectionsLoading(true));

    const { data: collections, error } = await requestGlobalCollections();
    if (error) {
      dispatch(setGlobalCollectionsLoadingError(error));
    } else if (!collections) {
      dispatch(setGlobalCollectionsLoadingError(new Error("unknown error")));
    } else {
      dispatch(setGlobalCollections(collections));
    }

    dispatch(setIsGlobalCollectionsLoading(false));
  };

export default {};
