import { createAsyncThunk } from "@reduxjs/toolkit";

import { getAdditionalInfo } from "@/utils/apiHelper";
import getEntityData from "./getEntityData";

export const fetchAllEntities = createAsyncThunk(
  "collections/fetchAllEntities",
  async () => {
    const collections: any = await getAdditionalInfo("/api/entity/collections");
    const collectionsMap = collections.map(async (collection) => {
      const colEntities = await Promise.all(
        collection.entities.map((e: any) => getEntityData(e, false))
      );
      return colEntities;
    });
    const finalEntities = await Promise.all(collectionsMap);
    return finalEntities;
  }
);

export const fetchEntityDetails = createAsyncThunk(
  "collections/fetchEntityDetails",
  async (entity: any) => {
    try {
      const fullEntity = await getEntityData(entity, true);
      return fullEntity;
    } catch (error) {
      return entity;
    }
  }
);
