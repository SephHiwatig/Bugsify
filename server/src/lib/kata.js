/**
 * Kata data access layer
 */
const assert = require("assert");
const initDbConnection = require('../utils/mongoConnection');

const addNewKata = async (kata) => {
    try {
        // Connect to database and insert the new Kata,
        // Verify that new kata is added with assert
        const connection = await initDbConnection();
        const insert = await connection.insertItem('katas', kata);
        connection.closeConnection();

        assert.strictEqual(1, insert.insertedCount);

        return { succeeded: true, message: "Ok" };
    } catch {
        return { succeeded: false, message: "Something went wrong." };
    }
}

const test = async () => {
    const connection = await initDbConnection();
    const katas = await connection.findAll('katas');
    connection.closeConnection();

    return katas;
}

module.exports = {
    addNewKata,
    test
}