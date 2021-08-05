import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../helpers/AppError";
import User from "../models/user.model";
import secrets from "../config/secrets";

const { jwtSecret } = secrets;

const generateTokenForUser = (user) => {
    const payload = {
        userId: user.id,
    };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "7d" });
    return {
        token: `Bearer ${token}`,
        user,
    };
};

const addNewUser = async (data) => {
    const { firstName, lastName, email, password } = data;
    let user = await User.findOne({ email });
    if (user) {
        throw new AppError.duplicate("User already exists");
    }
    user = new User({ firstName, lastName, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    user.password = undefined;
    return await user;
};

const getUser = async (data) => {
    const { email, password } = data;
    let user = await User.findOne({ email });
    if (!user) {
        throw new AppError.notFound("Bad credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new AppError.notFound("Bad credentials");
    }
    user.password = undefined;
    return await user;
};

export { generateTokenForUser, addNewUser, getUser };
