import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import theme from "./theme/theme";
import {
  AuthContextProvider,
  UserContextProvider,
} from "./context/AuthContext";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
});

ReactDOM.render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={<p>An error has occured</p>}>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <UserContextProvider>
            <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </SnackbarProvider>
          </UserContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </Sentry.ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
