const dotenv = require('dotenv');
const { ObjectId } = require('mongodb');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Database is already initialized!');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGO_URL)
        .then(client => {
            database = client
            callback(null, database);
        })
        .catch(err => {
            callback(err);
        });

}

const getDatabase = () => {
    if (!database) {
        throw new Error('Database not initialized!');
    }
    return database;
}

const getAll = async (collectionName) => {
    try {
        const result = await getDatabase().db().collection(collectionName).find();
        const data = await result.toArray();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const getSingle = async (collectionName, id) => {
    try {
        const result = await getDatabase().db().collection(collectionName).find({_id: new ObjectId(id)});
        if (result.length === 0) {
            throw new Error('No data found');
        }
        const data = await result.toArray();
        return data[0];
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const insertData = async (collectionName, data) => {
    try {
        const result = await getDatabase().db().collection(collectionName).insertOne(data);
        return result;
    } catch (error) {
        console.error('Error inserting data:', error);
        throw error;
    }
}

const updateData = async (collectionName, id, data) => {
    try {
        const result = await getDatabase().db().collection(collectionName).updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        );
        return result;
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
}

const deleteData = async (collectionName, id) => {
    try {
        const result = await getDatabase().db().collection(collectionName).deleteOne({ _id: new ObjectId(id) });
        return result;
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
}

module.exports = {
    initDb, 
    getAll,
    getSingle, 
    insertData,
    updateData,
    deleteData
}