import { createAction } from "@reduxjs/toolkit";

const resetEntityTokens = createAction<void>('entityCollections/resetEntityTokens')

export default resetEntityTokens;