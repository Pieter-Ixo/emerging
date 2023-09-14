/* eslint-disable no-param-reassign */

import { requestGlobalCollections } from "@/requests/blocksync-v2";

import type { AppThunk } from "../../store";
import {
  setGlobalCollections,
  setGlobalCollectionsError,
  setIsGlobalCollectionsLoading,
} from "../slice";

export default function fetchGlobalCollections(): AppThunk {
  return async (dispatch) => {
    dispatch(setIsGlobalCollectionsLoading(true));

    const { data: collections, error } = await requestGlobalCollections();
    if (error) {
      dispatch(setGlobalCollectionsError(error));
    } else if (!collections) {
      dispatch(
        setGlobalCollectionsError(
          new Error("unknown error while loading global collections")
        )
      );
    } else {
      dispatch(setGlobalCollections(collections));
    }

    dispatch(setIsGlobalCollectionsLoading(false));
  };
}
