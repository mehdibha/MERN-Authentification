import "./config/env";
import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import userRoute from "./routes/user.routes.js";
import passport from "passport";
import logger from 'morgan'
import secrets from "./config/secrets";
import "./config/passport";

const app = express();
connectDB(); // connect DB

const { port, env } = secrets

// middleWares
app.use(cors()); 
app.use(express.json()); 
app.use(logger('dev'))
app.use(passport.initialize());

// routes
app.use("/api/user", userRoute);

// serve Front End
if (env === "PRODUCTION") {
    app.use(express.static(path.resolve(__dirname,"..","client","build")));
    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname,"..","client","build", "index.html")));
}

// error handler ( must be last )
app.use(async (err, req, res, next) => {
    await errorHandler(err, res);
});

// server
app.listen(port, () => console.log(`*** Server running on port ${port} ***`));

