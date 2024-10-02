import { APIResponse } from "@/types/http";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userApi } from "./api";

type AuthStates = {
  userInfo: any;
};

const initialState: AuthStates = {
  userInfo: {
    subaccountId: "",
    bankBalances: [],
    subaccountBalancesMap: {},
    activeSubAccount: "",
  },
};

// slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, actions: PayloadAction<any>) => {
      state.userInfo = { ...state.userInfo, ...actions.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.login.matchFulfilled,
      (state, action: PayloadAction<APIResponse<any>>) => {
        state.userInfo = action?.payload?.data?.userInfo;
      }
    );
  },
});

export const { setUserInfo } = userSlice.actions;

// reducer
export const userStateReducer = userSlice.reducer;
