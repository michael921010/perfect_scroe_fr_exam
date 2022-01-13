import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, ScopedCssBaseline } from "@mui/material";
import theme from "styles/theme";
import Routes from "routes";
import Layout from "components/Layout";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <ScopedCssBaseline>
        <Layout>
          <Routes />
        </Layout>
      </ScopedCssBaseline>
    </ThemeProvider>
  );
}

export default App;
