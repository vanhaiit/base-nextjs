import { RootState } from "@/libs/redux/root-store";
import { createSelector } from "@reduxjs/toolkit";

export const getUserInfo = createSelector(
  [(state: RootState) => state.user],
  ({ userInfo }) => userInfo
);
