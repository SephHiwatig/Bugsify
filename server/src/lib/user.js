/**
 * User data access layer
 */
const bcrypt = require('bcrypt');
const assert = require("assert");
const initDbConnection = require('../utils/mongoConnection');

// userInfo: {username, firstname, lastname, email, password}
// returns: {succeeded, message}
const createNewUser = async (userInfo) => {

    try {
        // Initialize db connection
        const connection = await initDbConnection();
        const usersFromDb = await connection.findAll('users');

        // Check if username or email is already in use
        const userByUsername = usersFromDb.find(user => user.username === userInfo.username.toLowerCase());
        if(userByUsername)
            return { succeeded: false, message: "Username already in use."};
        const userByEmail = usersFromDb.find(user => user.email === userInfo.email.toLowerCase());
        if(userByEmail)
            return { succeeded: false, message: "Email already in use."};

        // Create new user, let Mongo generate unique id for users
        const newUser = {
            username: userInfo.username.toLowerCase(),
            firstname: userInfo.firstname.toLowerCase(),
            lastname: userInfo.lastname.toLowerCase(),
            email: userInfo.email,
            password: await bcrypt.hash(userInfo.password, 10),
            level: 1,
            exp: 0,
            questionsSolved: [],
            role: 'user'
        }

        // Insert new user to db
        const insert = await connection.insertItem('users', newUser);
        connection.closeConnection();

        // Verify that new user is added
        assert.strictEqual(1, insert.insertedCount);

        return { succeeded: true, message: "New user created."};
    } catch (error) {
        return { succeeded: false, message: "Failed to create user."};
    }
};

// returns { error, message, status, user }
const getUserByUsername = async (username) => {
    try {
        // Connect to database and get user by username
        const connection = await initDbConnection();
        const user = await connection.findByField('users', 'username', username);
        connection.closeConnection();

        // check if user exists
        if(!user) return {error: true, message: "Not found", status: 404, user };

        return { error: false, message: "Ok", status: 200, user };
    } catch (error) {
        throw { error: true, message: "Connection failed", status: 409, user: undefined };
    }
}

const matchPassword = async (inputPassword, storedPassword) => {
    return bcrypt.compare(inputPassword, storedPassword);
};

module.exports = {
    createNewUser,
    getUserByUsername,
    matchPassword
}