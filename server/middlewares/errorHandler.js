
const errorHandlers = async (err, req, res, next) => {
    let code = 500
    let message = "Internal Server Error"
    if (err.name == 'ValidationError') {
        code = 400
        message = Object.values(err.errors)[0].message
    } else if (err.name == 'empty_input') {
        code = 400
        message = "Every input can't be empty"
    } else if (err.name == 'MongoServerError') {
        code = 400
        message = "Email address already in use"
    } else if (err.name == 'invalid_email') {
        code = 400
        message = "Invalid email format"
    } else if (err.name == "invalid_credentials") {
        code = 404
        message = "error not found"
    } else if (err.name == 'no_credentials') {
        code = 400
        message = err.err
    }
    res.status(code).json({message})
}

module.exports = errorHandlers