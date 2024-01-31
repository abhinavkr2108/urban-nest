import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/UserSlice.jsx"; // Export default so we can change the name
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/lib/persistStore";

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
  version: 1,
};

const persistReducerUser = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistReducerUser,

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export const persistor = persistStore(store);
