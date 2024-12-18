import { PersistGate } from "redux-persist/integration/react";
import { GlobalStyle } from "./configs/global/GlobalStyle";
import { AppRoutes } from "./configs/routes/AppRoutes";
import { persistor, store } from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyle />
        <AppRoutes />
      </PersistGate>
    </Provider>
  );
}

export default App;
