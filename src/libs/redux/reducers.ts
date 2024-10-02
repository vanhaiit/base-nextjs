import { userStateReducer } from "@/stores/user";
import { combineReducers } from "redux";
import { baseQueryApi } from "./base-query";

const appReducer = combineReducers({
  user: userStateReducer,
  [baseQueryApi.reducerPath]: baseQueryApi.reducer,
});

export const rootReducer = (state: any, action: any) =>
  appReducer(state, action);
