import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";

const darkTheme = createMuiTheme({
    palette: {
        primary: red,
        secondary:grey,
        background: {
            default: "#141414",
            paper: 'red'
        },
        error: { main: "#e87c03" },
        text: { primary: "#fff", secondary: "#fff", disabled: "#fff" },
    },
    typography: {
        fontFamily : [
            'Montserrat',
            'sans-serif',
          ].join(',')
    },
});

export default darkTheme;
