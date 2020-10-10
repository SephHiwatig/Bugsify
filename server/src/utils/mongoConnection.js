
/**
 * Handles MongoDB Connection
 */
require("dotenv").config();

// Mongo
const { MongoClient } = require("mongodb");
const { MONGO_URI, DB_NAME } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const initDbConnection = async () => {
    try {
        // Connect to Mongo db
        const client = await MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db(DB_NAME);
        console.log("Connection successful: " + DB_NAME);
        return { db, client };
    } catch (error) {
        throw error;
    }
};

module.exports = initDbConnection;