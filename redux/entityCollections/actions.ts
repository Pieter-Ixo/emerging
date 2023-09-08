import { createAction } from "@reduxjs/toolkit";

export const resetEntityTokens = createAction<void>('entityCollections/resetEntityTokens')
export const resetSelectedEntity = createAction<void>('entityCollections/resetSelectedEntity')

