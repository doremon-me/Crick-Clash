import { BrowserRouter } from "react-router-dom";
import { QueryProvider, RouteProvider } from "./providers/providers";
import { ThemeProvider } from "./providers/theme.provider";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <QueryProvider>
          <RouteProvider />
        </QueryProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
