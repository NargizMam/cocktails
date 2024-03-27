import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {ThemeProvider} from "@mui/material";
import theme from "./theme.ts";
import {BrowserRouter} from "react-router-dom";
import {GOOGLE_CLIENT_ID} from "./constants.ts";
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <App/>
          </ThemeProvider>
        </BrowserRouter>
    </GoogleOAuthProvider>
)
