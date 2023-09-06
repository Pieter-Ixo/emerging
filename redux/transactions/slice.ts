import { createSlice } from "@reduxjs/toolkit";
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

  extraReducers(builder) {
    // fetchTransactionByHash
    builder.addCase(fetchTransactionByHash.pending, (state) => {
      state.isTransactionsLoading = true;
    });
    builder.addCase(fetchTransactionByHash.fulfilled, (state, action) => {
      state.isTransactionsLoading = false;
      state.transaction = action.payload;
    });
    builder.addCase(fetchTransactionByHash.rejected, (state, action) => {
      state.isTransactionsLoading = false;
      state.transactionsError = action.error as Error;
    });
  },
});

export default TransactionSlice.reducer;
