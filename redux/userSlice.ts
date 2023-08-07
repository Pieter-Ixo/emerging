import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface UserState {
  loggedIn: boolean;
  value: number;
  count: number;
  walletConnected: boolean;
  dashboardVisible: boolean;
  selectedView: "global" | "fullAssets" | "portfolio" | "singleAsset";
  selectedAssetId: { deviceId: string; assetId: string };
  ClaimableCarbon: number;
  impactNavi: string;
  connectedWallet: string | undefined;
}

const initialState: UserState = {
  loggedIn: false,
  value: 0,
  count: 0,
  walletConnected: false,
  dashboardVisible: true,
  selectedView: "global",
  selectedAssetId: { deviceId: "", assetId: "" },
  ClaimableCarbon: 0,
  impactNavi: "Saved",
  connectedWallet: undefined,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.loggedIn = action.payload;
      state.value = 0;
    },
    loginAsset: (state) => {
      state.loggedIn = true;
      state.value = 1;
    },
    loginDis: (state) => {
      state.loggedIn = true;
      state.value = 2;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.value = 0;
    },
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    connectWallet: (state, action) => {
      state.walletConnected = true;
      state.connectedWallet = action.payload as string;
    },
    disconnectWallet: (state) => {
      state.walletConnected = false;
      state.connectedWallet = undefined;
    },
    toggleDashboard: (state) => {
      state.dashboardVisible = !state.dashboardVisible;
    },
    setSelectedView(state, action) {
      state.selectedView = action.payload;
    },
    setSelectedAssetId(state, action) {
      state.selectedAssetId = action.payload;
    },
    setCarbonClaimable(state, action) {
      state.ClaimableCarbon = action.payload;
    },
    setImpactNavi: (state, action) => {
      state.impactNavi = action.payload;
    },
  },
  // FIXME: EMERGING-147: it throws a warning `createSlice.extraReducers` is deprecated, and will be removed
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.user,
    }),
  },
});

export const {
  loginAsset,
  loginDis,
  logout,
  setAuthState,
  increment,
  decrement,
  connectWallet,
  disconnectWallet,
  toggleDashboard,
  setSelectedView,
  setSelectedAssetId,
  setImpactNavi,
} = UserSlice.actions;
export const selectAuthState = (state) => state.user;
export const userCarbonClaimable = (state) => state.user.ClaimableCarbon;

export const { setCarbonClaimable } = UserSlice.actions;

const UserSliceReducer = UserSlice.reducer;
export default UserSliceReducer;
