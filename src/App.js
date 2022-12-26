import { ThemeProvider as TH, createTheme } from "@mui/material/styles"
import rtlPlugin from "stylis-plugin-rtl"
import { CacheProvider } from "@emotion/react"
import { HelmetProvider, Helmet } from "react-helmet-async"
import createCache from "@emotion/cache"
import { prefixer } from "stylis"

import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import { SnackbarProvider } from 'notistack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import useAuth from 'src/hooks/useAuth';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import AppInit from './components/AppInit';

function App() {
  
  const content = useRoutes(router);
  const auth = useAuth();

  const theme = createTheme({
    direction: "rtl"
  });

  const cacheRTL = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin]
  })

  return (
    <CacheProvider value={cacheRTL}>
      <TH theme={theme}>
        <HelmetProvider>
          <Helmet>
            <title>react dotr</title>
          </Helmet>
          <ThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <SnackbarProvider
                maxSnack={6}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
              >
                <CssBaseline />
                {auth.isInitialized ? content : <AppInit />}
              </SnackbarProvider>
            </LocalizationProvider>
          </ThemeProvider>
        </HelmetProvider>
      </TH>
    </CacheProvider>
  );
}
export default App;
