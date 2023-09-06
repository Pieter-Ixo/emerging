/* eslint-disable import/no-cycle */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import localStorage from "redux-persist/lib/storage";

import EntityCollectionSlice from "@/redux/entityCollections/slice";
import BatchesSlice from "@/redux/batches/slice";
import UserSlice from "@/redux/userSlice";
import TransactionSlice from "@/redux/transactions/slice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: localStorage,
};

export const rootReducer = combineReducers({
  user: UserSlice,
  entityCollection: EntityCollectionSlice,
  batches: BatchesSlice,
  transactions: TransactionSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
