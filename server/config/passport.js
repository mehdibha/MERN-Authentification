import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import secrets from "./secrets";
import User from "../models/user.model";

const { jwtSecret, google } = secrets

const JWToptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
};

const googleOptions = {
    clientID: google.clientId,
    clientSecret: google.clientSecret,
    callbackURL: google.callbackURL,
};

passport.use(
    new JwtStrategy(JWToptions, async (paylaod, done) => {
        try {
            const user = await User.findById(paylaod.userId).select("-password");
            if (!user) {
                done(null, false);
            }
            done(null, user);
        } catch (err) {
            done(err, false);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(
    new GoogleStrategy(googleOptions, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ email: profile.emails[0].value });
            if (user) {
                if (!user.googleId) {
                    user.googleId = profile.id;
                    user.avatar = profile.photos[0].value;
                    await user.save();
                }
                done(null, user);
            } else {
                user = new User({
                    email: profile.emails[0].value,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    googleId: profile.id,
                    avatar: profile.picture,
                });
            }
            await user.save();
            done(null, user);
        } catch (error) {
            console.log(error);
        }
    })
);
