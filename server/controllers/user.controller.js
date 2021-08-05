import secrets from "../config/secrets";
import { addNewUser, generateTokenForUser, getUser } from "../services/user.services";
import AppError from "../helpers/AppError";

const signUp = async (req, res, next) => {
    try {
        const validation = signUpValidation(req.body);
        if (validation){
            throw AppError.validation(validation)
        }
        const user = await addNewUser(req.body);
        const response = generateTokenForUser(user)
        return res.status(200).json(response)
    } catch (error) {
        next(error)
    }
};

const signIn = async (req, res,next) => {
    try {
        const validation = signInValidation(req.body);
        if (validation){
            throw AppError.validation(validation)
        }
        const user = await getUser(req.body)
        const response = generateTokenForUser(user)
        return res.status(200).json(response)
    } catch (error) {
        next(error)
    }
};

const googleSignIn = (req, res, next) => {
    try {
        const response = generateTokenForUser(req.user)
        res.cookie("x-auth-cookie", response.token);
        res.redirect(secrets.redirectURL);
    } catch (error) {
        next(error);
    }
};

const forgotPassword = async (req, res) => {
    try {
        res.send("forgotPWD is ok");
    } catch (error) {
        res.send(error);
    }
};

const resetPassword = async (req, res) => {
    try {
        res.send("resetPWD is ok");
    } catch (error) {
        res.send(error);
    }
};

const getAuthUser = async (req, res) => {
    try {
        res.status(200).json({ user: req.user });
    } catch (error) {
        next(error)
    }
};

const updateAuthUser = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};

export { signUp, signIn, forgotPassword, resetPassword, getAuthUser, googleSignIn, updateAuthUser };
