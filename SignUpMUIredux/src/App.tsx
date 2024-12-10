import AppRoutes from "./configs/routes/AppRoutes";
import { GlobalStyle } from "./configs/global/GlobalStyle";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

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
