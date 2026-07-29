const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const { connectDB } = require('./config/database');

const PORT = process.env.PORT || 5000;

// Connect to Database and Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`
============================================================
🎮 ଓଡ଼ିଆ ମାଧ୍ୟମ LEARNING GAMES SERVER RUNNING 🚀
============================================================
URL: http://localhost:${PORT}
Environment: ${process.env.NODE_ENV || 'development'}
Database: ${process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/odia_learning_games'}
============================================================
    `);
  });
});
