/**
 * User data access layer
 */
const bcrypt = require('bcrypt');
const assert = require("assert");
const initDbConnection = require('../utils/mongoConnection');

// userInfo: {username, firstname, lastname, email, password}
// returns: {errror, response}
const createNewUser = async (userInfo) => {

    try {
        // Initialize db connection
        const connection = await initDbConnection();
        const usersFromDb = await connection.db.collection("users").find().toArray();

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
        const insert = await connection.db.collection("users").insertOne(newUser);
        connection.client.close();

        // Verify that new user is added
        assert.strictEqual(1, insert.insertedCount);

        return { succeeded: true, message: "New user created."};
    } catch (error) {
        return { succeeded: false, message: "Failed to create user."};
    }
};

module.exports = {
    createNewUser
}