import passport from "passport";

const isAuth = passport.authenticate("jwt", { session: false });

const authGoogle = passport.authenticate("google", {
    scope: ["profile", "email"],
});

const authGoogleCallback = passport.authenticate("google", { failureRedirect: "/signin", session: false });

export { isAuth, authGoogle, authGoogleCallback };
