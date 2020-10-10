
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

        // Return the interface of db connection
        return { 
            db,
            findAll: _findAll(db), 
            findByField: _findByField(db),
            insertItem: _insertItem(db),
            closeConnection: _closeConnection(client)
        };

    } catch (error) {
        throw error;
    }
};

// Private functions, to be curried to provide interface
const _findAll = (db) => { 
    return async function(collection) {
        const usersFromDb = await db.collection(collection).find().toArray();
        return usersFromDb;
    }
};

const _findByField = (db) => {
    return async function(collection, field, value) {
        const query = {};
        query[field] = value;
        const userFromDb = await db.collection(collection).findOne(query);
        return userFromDb;
    }
};

const _insertItem = (db) => {
    return async function(collection, item) {
        const insert = await db.collection(collection).insertOne(item);
        return insert;
    }
};

const _closeConnection = (client) => {
    return function() {
        client.close();
    }
};

module.exports = initDbConnection;