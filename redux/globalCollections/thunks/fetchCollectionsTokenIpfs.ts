/* eslint-disable no-param-reassign */

import requestCollectionTokenIpfs from "@/requests/requesters/requestCollectionTokenIpfs";

import type { AppThunk } from "../../store";
import {
  setCollectionTokenIpfs,
  setCollectionTokenIpfsError,
  setIsCollectionTokenIpfsLoading,
} from "../slice";
import { selectCollectionStateById } from "../selectors";

export default function fetchCollectionsTokenIpfs(
  collectionId: string
): AppThunk {
  return async (dispatch, getState) => {
    const state = getState();
    const collectionState = selectCollectionStateById(state, collectionId);
    const collection = collectionState?.collection;

    if (!collection) {
      dispatch(
        setCollectionTokenIpfsError({
          id: collectionId,
          error: new Error("can not load collection profile, no collection"),
        })
      );
      return;
    }

    dispatch(
      setIsCollectionTokenIpfsLoading({ id: collectionId, isLoading: true })
    );
    const tokenIpfs = await requestCollectionTokenIpfs(collection);

    if (!tokenIpfs)
      dispatch(
        setCollectionTokenIpfsError({
          id: collectionId,
          error: new Error(
            "unknown error while loading collection's token IPFS"
          ),
        })
      );
    else
      dispatch(
        setCollectionTokenIpfs({
          id: collectionId,
          tokenIpfs,
        })
      );

    dispatch(
      setIsCollectionTokenIpfsLoading({ id: collectionId, isLoading: false })
    );
  };
}
