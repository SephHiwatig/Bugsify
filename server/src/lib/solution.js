/**
 * Solution data access layer
 */
const assert = require("assert");
const initDbConnection = require('../utils/mongoConnection');

const addNewSolution = async (solution, userId, kataId) => {
    try {
        const newSolution = {
            solution,
            answeredById: userId,
            likes: [],
            comments: [],
            dateAnswered: new Date(),
            kataId
        }
    
        const connection = await initDbConnection();
        const insert = await connection.insertItem('solutions', newSolution);
        connection.closeConnection();
        return insert.insertedId
    } catch (err) {
        return undefined;
    }
}

module.exports = {
    addNewSolution
}