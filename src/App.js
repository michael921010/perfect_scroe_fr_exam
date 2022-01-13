import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, ScopedCssBaseline } from "@mui/material";
import theme from "styles/theme";
import Routes from "routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <ScopedCssBaseline>
        <Routes />
      </ScopedCssBaseline>
    </ThemeProvider>
  );
}

export default App;
