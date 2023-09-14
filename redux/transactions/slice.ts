import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { ITransaction } from "@/types/transaction";

import { fetchTransactionByHash } from "./thunks";

export type TransactionState = {
  transaction: ITransaction | undefined;
  isTransactionsLoading: boolean;
  transactionsError: Error | undefined;
};

const initialState: TransactionState = {
  transaction: undefined,
  isTransactionsLoading: false,
  transactionsError: undefined,
};

const TransactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},

  extraReducers: (builder: ActionReducerMapBuilder<TransactionState>) => {
    (function fetchTransactionByHashReducer() {
      const { pending, fulfilled, rejected } = fetchTransactionByHash;
      builder
        .addCase(pending, (state) => ({
          ...state,
          isTransactionsLoading: true,
        }))
        .addCase(fulfilled, (state, action) => ({
          ...state,
          isTransactionsLoading: false,
          transaction: action.payload,
        }))
        .addCase(rejected, (state, action) => ({
          ...state,
          isTransactionsLoading: false,
          transactionsError: action.error as Error,
        }));
    })();
  },
});

export default TransactionSlice.reducer;
