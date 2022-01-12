import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, ScopedCssBaseline } from "@mui/material";
import theme from "styles/theme";
import Components from "views/Components";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <ScopedCssBaseline>
        <Components />
      </ScopedCssBaseline>
    </ThemeProvider>
  );
}

export default App;
