import express from "express"
import {signIn,signUp, googleSignIn, forgotPassword,resetPassword, getAuthUser, updateAuthUser} from "../controllers/user.controller";
import {isAuth,authGoogle,authGoogleCallback} from '../middlewares/auth'

const router = express.Router();

////// /api/user //////

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/update").put(isAuth,updateAuthUser);
router.route('/google').get(authGoogle)
router.route('/google/callback').get(authGoogleCallback,googleSignIn)
router.route("/current").get(isAuth, getAuthUser);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:resetToken").post(resetPassword);

export default router;