const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const { connectDB } = require('./config/database');

let PORT = parseInt(process.env.PORT || '5000', 10);

const startServer = (portToTry) => {
  const server = app.listen(portToTry, () => {
    console.log(`
============================================================
🎮 ଓଡ଼ିଆ ମାଧ୍ୟମ LEARNING GAMES SERVER RUNNING 🚀
============================================================
URL: http://localhost:${portToTry}
Environment: ${process.env.NODE_ENV || 'development'}
Database: ${process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/odia_learning_games'}
============================================================
    `);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`[Port Warning] Port ${portToTry} in use. Retrying on port ${portToTry + 1}...`);
      startServer(portToTry + 1);
    } else {
      console.error('Server error:', err);
    }
  });
};

// Connect to Database and Start Server
connectDB().then(() => {
  startServer(PORT);
});
