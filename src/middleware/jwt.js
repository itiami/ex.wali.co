//  middleware/jwt.js

import jwt from 'jsonwebtoken';

import bcrypt from "bcrypt";


// https://www.npmjs.com/package/jsonwebtoken

export const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        jwt.verify(token, process.env.__ACCESS_TOKEN_SECRET, (err, arg) => {
            if (err) {
                console.log({
                    message: err.message,
                    time: err.expiredAt
                });
                return res.status(403).json({
                    message: err.message,
                    time: err.expiredAt
                })
            } else {
                req.arg = arg;
                next();
            };

        });
    } catch (error) {
        res.status(400).send('Invalid token.');
    }
};


export const accessToken = (arg) => {
    const token = jwt.sign(
        arg,
        process.env.__ACCESS_TOKEN_SECRET,
        {
            algorithm: 'HS512',
            expiresIn: "1d"
            // here 7d=7 day, 1m=1 minuite, 1h=1 hour, 120=120ms ...etc...
        }
    );

    return token;
}


/* here we simply crypt a simple string. 
And this crypted string will be send to the browser by adding JWT sha512 hash algarithm 
insted of sendig a userid and passowrd inside the token we simply send this. 
Cause this does not store in the database. and no need for validation/comparison.
This simply store in browser with a exprire date */
export const encorder = async (arg) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(arg, salt);
    return hashedPassword;
}


