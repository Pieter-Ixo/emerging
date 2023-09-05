import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

// eslint-disable-next-line import/prefer-default-export
export const selectRoot = (state: RootState) => state;


export const selectConnectedWallet = createDraftSafeSelector(
    selectRoot,
    (state: RootState):any => state?.user.connectedWallet
  );