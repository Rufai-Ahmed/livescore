import { authApi } from "./authApi";
<<<<<<< HEAD
import { getFoodApi } from "./foodApi";
import { staffApi } from "./staffAPI";
import { organizationApi } from "./organizationApi";
=======
>>>>>>> 345a2c6dd0bdb3b3fe50c53be3548ed20bb32c77
import authReducer from "./slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
<<<<<<< HEAD
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
=======
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
>>>>>>> 345a2c6dd0bdb3b3fe50c53be3548ed20bb32c77
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
<<<<<<< HEAD
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
=======
	auth: persistedReducer,
	[authApi.reducerPath]: authApi.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}).concat(authApi.middleware),
>>>>>>> 345a2c6dd0bdb3b3fe50c53be3548ed20bb32c77
});

export const persistor = persistStore(store);
