require("dotenv").config();
const { ACCESS_TOKEN_SECRET } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Generates an access token for a user
const createTokenForUser = (user) => {
    const userTosign = {
        _id: user._id,
        username: user.username,
        role: user.role
    };

    const accessToken = jwt.sign(userTosign, ACCESS_TOKEN_SECRET, { expiresIn: '1d'});

    return accessToken;
};

// Compares the passwordInput with the hashed password in db
const matchPassword = async (inputPassword, storedPassword) => {
    return await bcrypt.compare(inputPassword, storedPassword);
};

// Token authentication middleware
const authenticateToken = (req, res, next) => {
    // Get token from header - "Bearer token...."
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // If no token is provided send 401
    if(!token) return res.sendStatus(401);

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        // If token is provided but invalid, respond with 403
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports = {
    matchPassword,
    createTokenForUser,
    authenticateToken
}