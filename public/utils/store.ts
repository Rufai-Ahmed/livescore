import { authApi } from "./authApi";
import { getFoodApi } from "./foodApi";
import { staffApi } from "./staffAPI";
import { organizationApi } from "./organizationApi";
import authReducer from "./slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [getFoodApi.reducerPath]: getFoodApi.reducer,
  [staffApi.reducerPath]: staffApi.reducer,
  [organizationApi.reducerPath]: organizationApi.reducer,
  auth: persistedReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      getFoodApi.middleware,
      staffApi.middleware,
      organizationApi.middleware
    ),
});

export const persistor = persistStore(store);
