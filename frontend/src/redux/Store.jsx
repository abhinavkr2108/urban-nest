import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/UserSlice.jsx"; // Export default so we can change the name

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
