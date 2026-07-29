const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getIsConnected, memoryStore } = require('../config/database');

const requireAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'ଅନୁମୋଦନ ଆବଶ୍ୟକ। ଦୟାକରି ଲଗଇନ୍ କରନ୍ତୁ।',
      error: 'UNAUTHORIZED'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'odia_learning_games_super_secret_jwt_key_2026');
    let user;

    if (getIsConnected()) {
      user = await User.findById(decoded.id).select('-passwordHash');
    } else {
      user = memoryStore.users.find(u => u._id === decoded.id);
    }

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'ଉପଭୋକ୍ତା ମିଳିଲା ନାହିଁ କିମ୍ବା ନିଷ୍କ୍ରିୟ ଅଛି।',
        error: 'USER_NOT_FOUND'
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'ଟୋକନ୍ ବୈଧ ନୁହେଁ।',
      error: 'INVALID_TOKEN'
    });
  }
};

module.exports = { requireAuth };
