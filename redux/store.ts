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
import storage from "redux-persist/lib/storage";

import CollectionSlice from "@/redux/collectionSlice";
import UserSlice from "@/redux/userSlice";
import SupamotoSlice from "@/redux/supamotoSlice";
import StovesSlice from "@/redux/stoveSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
};

export const rootReducers = combineReducers({
  user: UserSlice,
  collection: CollectionSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

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
