import { configureStore, combineReducers } from "@reduxjs/toolkit"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"

import cartReducer from "./cartRedux"
import userReducer from "./userRedux"
import orderReducer from "./orderRedux"
// combine reducers so persist can target root slices
const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  order: orderReducer,
})

// persist configuration — adjust whitelist to persist only needed slices
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "user"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ignore redux-persist action types for serializable check
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

const persistor = persistStore(store)

export { persistor }
export default store
