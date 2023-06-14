import { getTable } from "@/pages/api/hello";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { fetchStoveById } from "../requests/historicalDataEmergingEco";

export interface SupamotoState {
  value: any;
  status: "idle" | "loading" | "failed";
  loading: boolean;
  count: number;
}

const initialState: SupamotoState = {
  value: {},
  status: "idle",
  loading: true,
  count: 0,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchStove = createAsyncThunk(
  "supamoto/fetch",
  async (amount: string) => {
    const response = await fetchStoveById(amount);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const getAll = createAsyncThunk(
  "supamoto/getAll",
  async (table: string) => {
    const response = await getTable(table);
    return response;
  }
);

export const SupamotoSlice = createSlice({
  name: "supamoto",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.supamoto,
    }),
  },
});

export const { increment, decrement } = SupamotoSlice.actions;
export const selectSupa = (state) => state.supamoto;

export default SupamotoSlice.reducer;
