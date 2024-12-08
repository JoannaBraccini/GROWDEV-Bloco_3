import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./modules/rootReducer";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Para persistência no localStorage

// Configuração de persistência
const persistConfig = {
  key: "mui-app-academy",
  storage,
  whitelist: ["userLogged"], // Estados que serão persistidos
};

// Aplicando persistência no reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuração da store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persistor
export const persistor = persistStore(store);

// Tipos
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
