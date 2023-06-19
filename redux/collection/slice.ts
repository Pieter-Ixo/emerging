/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { ICollection, IEntity } from "@/types/entityCollections";
import { fetchAllEntities, fetchEntityDetails } from "./thunks";

type CollectionState = {
  collections: ICollection[];
  entities: IEntity[];
  completeLoad: boolean;
};

const initialState: CollectionState = {
  collections: [],
  entities: [],
  completeLoad: false,
};

const CollectionSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    setCollections: (state, action: PayloadAction<ICollection[]>) => {
      state.collections = action.payload;
    },
    setEntities: (state, action: PayloadAction<IEntity[]>) => {
      state.entities = action.payload;
    },
    setComplete: (state, action: PayloadAction<boolean>) => {
      state.completeLoad = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAllEntities.fulfilled, (state, action) => {
      state.entities = action.payload;
    });
    builder.addCase(fetchEntityDetails.fulfilled, (state, action) => {
      state.entities = state.entities.map((entity) =>
        entity.id === action.payload.id ? action.payload : entity
      );
    });
    builder.addCase(HYDRATE, (state, action) => ({
      ...state,
      ...action,
    }));
  },
});

export const { setCollections, setEntities, setComplete } =
  CollectionSlice.actions;

export default CollectionSlice.reducer;
