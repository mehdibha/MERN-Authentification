import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./assets/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router } from "react-router-dom";
import { getAuthUser } from "./actions/userActions";
import Cookies from "js-cookie";
import Routes from "./Routes";

function App() {
    const isLoading = useSelector((state) => state.userReducer.isLoading);
    const dispatch = useDispatch();
    useEffect(() => {
        window.history.replaceState("", document.title, window.location.pathname);
        const cookieJwt = Cookies.get("auth-cookie");
        if (cookieJwt) {
            Cookies.remove("auth-cookie");
            localStorage.setItem("token", cookieJwt);
        }
        dispatch(getAuthUser());
    }, [dispatch]);

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {!isLoading && <Routes />}
            </ThemeProvider>
        </Router>
    );
}

export default App;
