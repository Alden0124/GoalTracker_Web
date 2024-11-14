import { ThemeProvider } from "@/context/ThemeContext";
import Routes from "./router";

function App() {
  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
