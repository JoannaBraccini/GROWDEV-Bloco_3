## Vite

npm create vite@latest HarryPotter -- --template react-ts
npm i

limpeza do css

## React Router

npm i react-router

-config>routes>AppRoutes

# Mui

npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install @fontsource/poppins

import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';
fontFamily: 'Poppins, sans-serif'

-cssBaseline/globalstyles > App

## Redux Toolkit

npm install @reduxjs/toolkit
npm install react-redux
-extensão de navegador Redux DevTools-

-store config
-hooks config
-modules>Slices:Nome, ValorInicial, Actions(reducers)
-prover o Provider no App
-rootReducer config

## Redux Persist

npm i redux-persist

-persist config > store/index.ts
~>imports importantes:
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

-prover persistor no App
-whitelist/blacklist config > store/index.ts
-middleware p/ erros de serialize > store/index.ts

## Axios

npm install axios
-axios instance > config/services>api.service.ts
-.env config

## Async Thunk

-config nos modules
