import { createTheme } from "@mui/material/styles";
const colors = require("./colors");

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
  },
});

export default theme;
