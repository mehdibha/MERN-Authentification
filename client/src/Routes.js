import React from "react";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { HOME, BROWSE, SIGN_IN, SIGN_UP, MOVIES, TVSHOWS, NOT_FOUND } from "./constants/routes";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";

const Routes = () => {
    const location = useLocation();
    const isAuth = useSelector((state) => state.userReducer.isAuth);
    return (
        <>
            {location.pathname.slice(0, 7) === "/browse" && isAuth && <Navbar />}
            <Switch>
                <Route exact path={HOME} component={Home} />
                <PrivateRoute exact path={BROWSE} component={Browse} />
                <Route exact path={SIGN_IN} component={SignIn} />
                <Route exact path={SIGN_UP} component={SignUp} />
                <Route exact path={NOT_FOUND} component={NotFound} />
                <Route exact path="*" component={() => <Redirect to={NOT_FOUND} />} />
            </Switch>
        </>
    );
};

export default Routes;
