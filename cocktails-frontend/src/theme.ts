import {createTheme} from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: 'monospace',
    fontSize: 16,
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          marginBottom: '5px',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        contained: {
          margin: '5px',
          backgroundColor: '#757575',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#424242',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '1rem',
          backgroundColor: '#f5f5f5',
          color: '#333',
        },
      },
    },
  },
});

export default theme;