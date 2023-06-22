/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { IBatch } from "@/types/certificates";

// eslint-disable-next-line import/no-cycle
import { fetchAllBatches } from "./thunks";

export type IBatchesState = {
  batches: IBatch[];
  isBatchesLoading: boolean;
};

const initialState: IBatchesState = {
  isBatchesLoading: false,
  batches: [],
};

const BatchesSlice = createSlice({
  name: "batches",
  initialState,
  reducers: {
    setBatches: (state, action: PayloadAction<IBatch[]>) => {
      state.batches = action.payload;
    },
    setIsBatchesLoading: (
      state,
      action: PayloadAction<IBatchesState["isBatchesLoading"]>
    ) => {
      state.isBatchesLoading = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAllBatches.fulfilled, (state, action) => {
      state.batches = action.payload;
    });
    builder.addCase(HYDRATE, (state, action) => ({
      ...state,
      ...action,
    }));
  },
});

export const { setBatches, setIsBatchesLoading } = BatchesSlice.actions;

export default BatchesSlice.reducer;
