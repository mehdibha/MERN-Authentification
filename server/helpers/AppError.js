class AppError extends Error {
    constructor(name, statusCode, isOperational, description) {
        super(description);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
    }
    static badRequest(msg){
        return new AppError('Bad request', 400, true, msg)
    }
    static notFound(msg){
        return new AppError('Not Found', 404, true, msg)
    }
    static internal(msg){
        return new AppError('Internal server error', 500, true, msg)
    }
    static duplicate(msg){
        return new AppError('Deplicate error',409,true,msg)
    }
    static validation(msg){
        return new AppError('Validation error',422,true,msg)
    }
    static unauthorized(msg){
        return new AppError('Validation error',401,true,msg)
    }
// test
}

export default AppError