import React, { useState, useEffect } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../actions/userActions";
import * as Yup from "yup";
import CircularProgress from "@material-ui/core/CircularProgress";
import Icon from "@material-ui/core/Icon";
import Logo from "../../assets/images/logo.png";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const SignIn = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isLoadingLocal = useSelector((state) => state.userReducer.isLoading);
    const isAuth = useSelector((state) => state.userReducer.isAuth);
    const error = useSelector((state) => state.userReducer.error);
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("L'e-mail n'est pas valide").required("L'adresse e-mail est requise"),
            password: Yup.string()
                .min(6, "le mot de passe doit faire entre 6 et 20 caractères")
                .max(20, "le mot de passe doit faire entre 6 et 20 caractères")
                .required("Le mot de passe est requis"),
        }),
        onSubmit: (values) => {
            dispatch(signIn(values));
        },
    });

    useEffect(() => {
        if (isAuth) {
            history.push("/browse");
        }
    }, [isAuth, history]);

    return (
        <Container component="main" maxWidth="xs" className={classes.paper}>
            <Typography component="h1" variant="h4" className={classes.title}>
                Connexion
            </Typography>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
                {error && (
                    <Paper className={classes.error}>
                        {error.map((elem) => (
                            <Typography component="div" variant="body2">
                                {elem.msg}
                            </Typography>
                        ))}
                    </Paper>
                )}
                <TextField
                    error={Boolean(formik.touched.email && formik.errors.email)}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    helperText={formik.touched.email && formik.errors.email}
                    variant="filled"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Adresse e-mail"
                    name="email"
                    autoComplete="off"
                />
                <TextField
                    error={Boolean(formik.touched.password && formik.errors.password)}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    helperText={formik.touched.password && formik.errors.password}
                    variant="filled"
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Mot de passe"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Se souvenir de moi" />
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submitBtn}>
                    {isLoadingLocal ? <CircularProgress size={24} color="white" /> : "Se connecter"}
                </Button>
                <Link href="http://localhost:8080/api/user/google">
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.googleBtn}
                        startIcon={<Icon className="fab fa-google" />}
                    >
                        Se connecter avec google
                    </Button>
                </Link>
                <Grid container>
                    <Grid item xs>
                        <Link variant="body2">Mot de passe oublié?</Link>
                    </Grid>
                    <Grid item>
                        Pas de compte?{" "}
                        <Link component={RouterLink} to="/signup" variant="body2">
                            inscrivez-vous
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(8, "auto"),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    logo: {
        width: 200,
        marginBottom: theme.spacing(6),
    },
    form: {
        width: "100%", // Fix IE 11 issue.
    },
    submitBtn: {
        margin: theme.spacing(2, 0, 2, 0),
    },
    googleBtn: {
        margin: theme.spacing(0, 0, 4, 0),
    },
    title: {
        letterSpacing: "10px",
        margin: theme.spacing(0, 0, 4, 0),
    },
    error: {
        backgroundColor: theme.palette.error.main,
        padding: theme.spacing(2),
    },
}));

export default SignIn;
