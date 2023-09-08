
require('dotenv').config()//imports the dotenv and invokes its config() so that we can access our SECRET var from .env file. The dotenv package is used to load environment variables from a .env file into Node.js application. It allows to store configuration data, such as secrets, without hardcoding them into your code.
const jwt = require('jsonwebtoken')//importing the jsonwebtoken library. jsonwebtoken is a popular library for working with JSON Web Tokens (JWTs). It's used for creating and verifying JWTs.
const {SECRET} = process.env//destructure SECRET env var from the .env file.This variable is typically used as the secret key for signing and verifying JWTs.

//The following code exports an object with an isAuthenticated method, which is an Express.js middleware function
module.exports = {
    isAuthenticated: (req, res, next) => {//this method is called in index.js before calling any of the post router function to check if user has authorization for accessing the posts section to add, edit/delete
        const headerToken = req.get('Authorization')//retrieves the token from the HTTP request's "Authorization" header.

        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)//401 is unauthorized error code
        }

        let token// declared to store the decoded JWT.

        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500//internal server error
            throw err
        }

        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
    }
}
/**require('dotenv').config(): This line is importing the dotenv package and calling its config method. The dotenv package is used to load environment variables from a .env file into your Node.js application. It allows you to store configuration data, such as secrets, without hardcoding them into your code.

const jwt = require('jsonwebtoken'): This line is importing the jsonwebtoken library. jsonwebtoken is a popular library for working with JSON Web Tokens (JWTs). It's used for creating and verifying JWTs.

const { SECRET } = process.env: Here, the SECRET environment variable is being destructured from the process.env object. This assumes that you have defined a SECRET variable in your .env file. This variable is typically used as the secret key for signing and verifying JWTs.

module.exports = {...}: This code exports an object with an isAuthenticated method, which is an Express.js middleware function.

isAuthenticated Middleware:
req, res, next are the standard Express.js middleware function arguments representing the request, response, and next middleware function, respectively.

const headerToken = req.get('Authorization'): This line retrieves the token from the HTTP request's "Authorization" header. The token is expected to be included in requests as a bearer token (e.g., "Bearer YOUR_TOKEN").

if (!headerToken) {...}: This conditional checks if no token was provided in the "Authorization" header. If there's no token, it sends a 401 (Unauthorized) response and logs an error message.

let token: This variable is declared to store the decoded JWT.
try {...} catch (err) {...}: This block attempts to verify the provided token using jwt.verify. If verification fails (e.g., due to an invalid or expired token), it catches the error, sets a status code of 500 (Internal Server Error), and throws the error.
if (!token) {...}: If the token is successfully decoded and verified, it checks if token is still falsy (e.g., it might be null or undefined). If there's no valid token, it creates a new error, sets a status code of 401 (Unauthorized), and throws the error.
next(): If a valid token is found, it calls the next() function to pass control to the next middleware or route handler in the Express.js middleware chain.
In summary, this middleware is designed to be used in your Express.js application to protect routes that require authentication. It checks for the presence of a valid JWT token in the "Authorization" header, and if the token is missing or invalid, it responds with an appropriate status code and error message. If a valid token is present, it allows the request to continue to the next middleware or route handler. */