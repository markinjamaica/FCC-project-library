const { MongoClient } = require('mongodb');
require('dotenv').config();

// Replace the following with your Atlas connection string
const url = process.env.DB;
const client = new MongoClient(url);

async function connection(callback) {
    try {
        // connect to mongodb cluster
        await client.connect();
        console.log('Connected correctly to server');

        // make database calls
        await callback(client);
    } catch (err) {
        console.log(err);
        throw new Error('Unable to connect to the database');
    }
}

module.exports = connection;
