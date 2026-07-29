const mongoose = require('mongoose');
const memoryStore = require('./defaultData');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/odia_learning_games';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000
    });
    isConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[Database Warning] MongoDB local service not connected (${error.message}). Switched to Embedded Standalone Memory Store.`);
    isConnected = false;
    await memoryStore.seedDefaults();
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected, memoryStore };
