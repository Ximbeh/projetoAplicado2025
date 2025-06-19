import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007CC2",
    },
    secondary: {
      main: "#29166F",
    },
    background: {
      default: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    fontWeightRegular: 500,
  },
});

export default theme;
