import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface UserState {
  walletConnected: boolean;
  connectedWallet: string | undefined;
}

const initialState: UserState = {
  walletConnected: false,
  connectedWallet: undefined,
};

const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    connectWallet: (state, action) => {
      state.walletConnected = true;
      state.connectedWallet = action.payload as string;
    },
    disconnectWallet: (state) => {
      state.walletConnected = false;
      state.connectedWallet = undefined;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.user,
    }),
  },
});

export const { connectWallet, disconnectWallet } = UserSlice.actions;
export const selectAuthState = (state) => state.user;
export const userCarbonClaimable = (state) => state.user.ClaimableCarbon;

const UserSliceReducer = UserSlice.reducer;
export default UserSliceReducer;
