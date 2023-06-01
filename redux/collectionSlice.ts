import { getAdditionalInfo } from '@/utils/apiHelper';
import { getServiceEndpoint } from '@/utils/did';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

type CollectionState = {
  collections: any[];
  entities: any[];
  completeLoad: boolean;
};

const initialState = {
  collections: [],
  entities: [],
  completeLoad: false,
} as CollectionState;

const CollectionSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    setCollections: (state, action: PayloadAction<any[]>) => {
      state.collections = action.payload;
    },
    setEntities: (state, action: PayloadAction<any[]>) => {
      state.entities = action.payload;
    },
    setComplete: (state, action: PayloadAction<boolean>) => {
      state.completeLoad = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAllEntities.fulfilled, (state, action) => {
      state.entities = action.payload;
    })
    builder.addCase(fetchEntityDetails.fulfilled, (state, action) => {
      state.entities = state.entities.map((entity) => (entity.id === action.payload.id ? action.payload : entity));
    });
    builder.addCase(HYDRATE, (state, action) => ({
      ...state,
      ...action,
    }));
  },
});

export const { setCollections, setEntities, setComplete } = CollectionSlice.actions;

export default CollectionSlice.reducer;

export const fetchAllEntities = createAsyncThunk('collections/fetchAllEntities', async (thunkAPI) => {
  const collections: any = await getAdditionalInfo('/api/entity/collections');
  if (collections.problem) throw collections.problem;
  const collectionsMap = collections.map(async (collection: any) => {
    console.log("fetchAllEntities");
    const colEntities = await Promise.all(collection.entities.map((e: any) => getEntityData(e, false)));
    return colEntities;
  });
  const finalEntities = await Promise.all(collectionsMap);
  return finalEntities;
});

export const fetchEntityDetails = createAsyncThunk('collections/fetchEntityDetails', async (entity: any, thunkAPI) => {
  try {
    const fullEntity = await getEntityData(entity, true);
    return fullEntity;
  } catch (error) {
    return entity;
  }
});

/**
 * Helper function to get entities tags and profile details and flatten into entity object
 */
export const getEntityData = async (entity: any, fetchDetails = false) => {
  // No external API to call - data is on the entity structure and only needs to be formatted
  const assetDashboard = entity.linkedResource.find((r: any) => r.id.includes('#asset-dashboard'))?.serviceEndpoint;
  const assetId = assetDashboard?.substring((assetDashboard?.indexOf('=')) + 1);

  // External API calls that may cause rate limit issues and should only be used for single entities
  if (fetchDetails) {
    const [profile, tags, token, page] = await Promise.all([
      entity?.settings?.Profile?.serviceEndpoint
        ? getAdditionalInfo(getServiceEndpoint(entity.settings.Profile.serviceEndpoint, entity.service))
        : null,
      entity?.settings?.Tags?.serviceEndpoint
        ? getAdditionalInfo(getServiceEndpoint(entity.settings.Tags.serviceEndpoint, entity.service))
        : null,
      getAdditionalInfo(
        getServiceEndpoint(
          entity.linkedResource.find((r: any) => r.id.includes('#token')).serviceEndpoint,
          entity.service,
        ),
      ) as any,
      entity?.settings?.Page?.serviceEndpoint
        ? getAdditionalInfo(getServiceEndpoint(entity.settings.Page.serviceEndpoint, entity.service))
        : null,
    ]);

    return {
      ...entity,
      details: profile,
      tagDetails: tags,
      token: token?.properties?.denom,
      page: page,
      assetId: assetId,
    };
  } else {
    return {
      ...entity,
      details: null,
      tagDetails: null,
      token: null,
      page: null,
      assetId: assetId,
    };
  }
};
/* From develop branch before taken over from Northroom
ToDO: All of these data points are neeed
      const data = {
        ...col,
        details: details,
        pageDetails: tempPage,
        tagDetails: tempTags,
        claimDetails: tempClaims,
        // @ts-ignore
        token: ttoken?.properties?.denom,
        // sdgs: sdgs.sdgs,
        date: date.toISOString(),
        device: device,
      };
      return data;
    });
*/