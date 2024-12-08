import { Provider } from "react-redux";
import { GlobalStyle } from "./config/global/GlobalStyle";
import { AppRoutes } from "./config/routes/AppRoutes";
import { store, persistor } from "./config/store";
import { PersistGate } from "redux-persist/integration/react";

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
