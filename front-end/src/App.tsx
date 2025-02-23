import { BrowserRouter } from "react-router-dom";
import { QueryProvider, RouteProvider } from "./providers/providers";
import { ThemeProvider } from "./providers/theme.provider";
import { Toaster } from "./ui/sonner";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <QueryProvider>
          <Toaster />
          <RouteProvider />
        </QueryProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
