import {} from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface UserState {
  loggedIn: boolean;
  value: number;
  count: number;
  walletConnected: boolean;
  dashboardVisible: boolean;
  selectedView: String;
  selectedAssetId: { deviceId: string; assetId: string };
  ClaimableCarbon: number;
  impactNavi: string;
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
};

export const UserSlice = createSlice({
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
    connectWallet: (state) => {
      state.walletConnected = true;
    },
    disconnectWallet: (state) => {
      state.walletConnected = false;
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
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      };
    },
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

export default UserSlice.reducer;
