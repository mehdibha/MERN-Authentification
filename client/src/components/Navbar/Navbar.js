import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Searchbox from "../Searchbox";
import Logo from "../Logo";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import NavbarMenu from "./NavbarMenu";


const useStyles = makeStyles((theme) => ({
    navbar: {
        background: "linear-gradient(to bottom,rgba(0,0,0,.7) 10%,rgba(0,0,0,0))",
    },
    logo: {
        width: "90px",
    },
}));

const Navbar = () => {
    const classes = useStyles();
    const [navBackground, setNavBackground] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const changeBackground = () => {
            if (window.scrollY > 50) {
                setNavBackground("yellow");
            } else {
                setNavBackground("blue");
            }
        };
        if (location.pathname === "/browse") {
            window.addEventListener("scroll", changeBackground);
        } else {
            window.removeEventListener("scroll", changeBackground);
        }
    }, [location.pathname]);

    return (
        <AppBar position="fixed" elevation={0} className={classes.navbar} component="nav">
            <Toolbar>
                <Logo className={classes.logo} />
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button variant="text">Accueil</Button>
                    <Button variant="text">Films</Button>
                    <Button variant="text">Séries TV</Button>
                    <Button variant="text">Ma liste</Button>
                </ButtonGroup>
                <Searchbox />
                <NavbarMenu />
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
