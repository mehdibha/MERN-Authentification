const port = process.env.PORT || 4444
const clientURL = process.env.CLIENT_URL
const config = {
    env: process.env.NODE_ENV || "DEVELOPMENT",
    db: {
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        },
        uri: `${process.env.MONGODB_URI}?retryWrites=true&w=majority`,
    },
    port,
    clientURL,
    jwtSecret: process.env.JWT_SECRET,
    google: {
        clientId: process.env.GOOGLE_ID_CLIENT,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: `${clientURL}/api/user/google/callback`,
    },
    redirectURL:clientURL,
};

export default config;
