import { ThemeProvider } from "@/provider/ThemeProvider";
import Routes from "./router";
// style
import "@/assets/style/common.css";
// redux
import { Provider } from "react-redux";
import { store } from "@/stores";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
