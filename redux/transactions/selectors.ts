import { createDraftSafeSelector } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { TransactionState } from "./slice";

export const selectRoot = (state: RootState) => state;

export const selectTransactionsState = createDraftSafeSelector(
  selectRoot,
  (state: RootState): TransactionState => state?.transactions
);

export const selectTransaction = createDraftSafeSelector(
  selectTransactionsState,
  (state: TransactionState) => state?.transaction
);
export const selectTransactionIsLoading = createDraftSafeSelector(
  selectTransactionsState,
  (state: TransactionState) => state?.isTransactionsLoading
);
export const selectTransactionError = createDraftSafeSelector(
  selectTransactionsState,
  (state: TransactionState) => state?.transactionsError
);
