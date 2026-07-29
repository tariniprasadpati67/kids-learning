const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const classRoutes = require('./routes/classRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const bookRoutes = require('./routes/bookRoutes');
const chapterRoutes = require('./routes/chapterRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const gameRoutes = require('./routes/gameRoutes');
const questionRoutes = require('./routes/questionRoutes');
const progressRoutes = require('./routes/progressRoutes');
const badgeRoutes = require('./routes/badgeRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();

// Security Middlewares
app.use(helmet({
  contentSecurityPolicy: false // Allow dynamic inline scripts & images for games
}));

app.use(cors({
  origin: '*',
  credentials: true
}));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 500,
  message: { success: false, message: 'ଅତ୍ୟଧିକ ଅନୁରୋଧ! ଦୟାକରି କିଛି ସମୟ ଅପେକ୍ଷା କରନ୍ତୁ।', error: 'RATE_LIMIT' }
});

app.use('/api/', apiLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'ଓଡ଼ିଆ ମାଧ୍ୟମ Learning Games API ଠିକ୍‌ ଚାଲୁଛି! 🚀',
    timestamp: new Date()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/chapters', chapterRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/badges', badgeRoutes);
app.use('/api/admin', adminRoutes);

// Static frontend serving
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
