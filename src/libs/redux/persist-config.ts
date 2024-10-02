import storage from "redux-persist/es/storage";
import { rootReducer } from "./reducers";
import { getPersistConfig } from "redux-deep-persist";
//
export const persistConfig = getPersistConfig({
  key: "root", // the key to persist under
  storage: storage, // or AsyncStorage for React Native
  rootReducer, // your root reducer
  blacklist: [], // add reducers you don't want to persist
  whitelist: ["auth", "settings"],
});
