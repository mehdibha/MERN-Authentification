import AppError from "./AppError";

const errorHandler = async (err, res) => {
    if (err instanceof AppError) {
        const message = err.message;
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).json({
            status: "error",
            message,
        });
    } else {
        console.log(err)
        return res.status(500).json({
            status: "error",
            message: "something went wrong",
        });
    }
};

export default errorHandler;
