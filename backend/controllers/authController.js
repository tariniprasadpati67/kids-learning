const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { getIsConnected, memoryStore } = require('../config/database');
const bcrypt = require('bcryptjs');

// @desc Register Student
// @route POST /api/auth/register
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, classLevel, avatar } = req.body;
    const lowerEmail = email.toLowerCase().trim();

    if (getIsConnected()) {
      const userExists = await User.findOne({ email: lowerEmail });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'ଏହି ଇମେଲ୍‌ରେ ପୂର୍ବରୁ ଆକାଉଣ୍ଟ୍‌ ଅଛି। ଦୟାକରି ଲଗଇନ୍ କରନ୍ତୁ।',
          error: 'USER_EXISTS'
        });
      }

      const passwordHash = await User.hashPassword(password);
      const user = await User.create({
        name: name.trim(),
        email: lowerEmail,
        passwordHash,
        role: 'student',
        classLevel: parseInt(classLevel, 10) || 1,
        avatar: avatar || '🎓'
      });

      const token = generateToken(user._id, user.role);

      return res.status(201).json({
        success: true,
        message: 'ସଫଳତାର ସହ ପଞ୍ଜୀକରଣ ହେଲା!',
        data: {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            classLevel: user.classLevel,
            avatar: user.avatar,
            totalStars: user.totalStars,
            completedGames: user.completedGames
          }
        }
      });
    } else {
      // Memory store fallback
      const userExists = memoryStore.users.find(u => u.email === lowerEmail);
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'ଏହି ଇମେଲ୍‌ରେ ପୂର୍ବରୁ ଆକାଉଣ୍ଟ୍‌ ଅଛି।',
          error: 'USER_EXISTS'
        });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = {
        _id: `u_${Date.now()}`,
        name: name.trim(),
        email: lowerEmail,
        passwordHash,
        role: 'student',
        classLevel: parseInt(classLevel, 10) || 1,
        avatar: avatar || '🎓',
        totalStars: 0,
        totalGames: 0,
        completedGames: 0,
        isActive: true,
        createdAt: new Date()
      };

      memoryStore.users.push(newUser);
      const token = generateToken(newUser._id, newUser.role);

      return res.status(201).json({
        success: true,
        message: 'ସଫଳତାର ସହ ପଞ୍ଜୀକରଣ ହେଲା!',
        data: {
          token,
          user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            classLevel: newUser.classLevel,
            avatar: newUser.avatar,
            totalStars: newUser.totalStars,
            completedGames: newUser.completedGames
          }
        }
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc Login Student / Admin
// @route POST /api/auth/login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const lowerEmail = email.toLowerCase().trim();

    if (getIsConnected()) {
      const user = await User.findOne({ email: lowerEmail }).select('+passwordHash');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'ଇମେଲ୍ କିମ୍ବା ପାସୱାର୍ଡ ଭୁଲ୍ ଅଛି।',
          error: 'INVALID_CREDENTIALS'
        });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'ଇମେଲ୍ କିମ୍ବା ପାସୱାର୍ଡ ଭୁଲ୍ ଅଛି।',
          error: 'INVALID_CREDENTIALS'
        });
      }

      const token = generateToken(user._id, user.role);

      return res.json({
        success: true,
        message: `ସ୍ୱାଗତ, ${user.name}!`,
        data: {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            classLevel: user.classLevel,
            avatar: user.avatar,
            totalStars: user.totalStars,
            completedGames: user.completedGames
          }
        }
      });
    } else {
      // Memory store fallback
      const user = memoryStore.users.find(u => u.email === lowerEmail);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'ଇମେଲ୍ କିମ୍ବା ପାସୱାର୍ଡ ଭୁଲ୍ ଅଛି।',
          error: 'INVALID_CREDENTIALS'
        });
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'ଇମେଲ୍ କିମ୍ବା ପାସୱାର୍ଡ ଭୁଲ୍ ଅଛି।',
          error: 'INVALID_CREDENTIALS'
        });
      }

      const token = generateToken(user._id, user.role);

      return res.json({
        success: true,
        message: `ସ୍ୱାଗତ, ${user.name}!`,
        data: {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            classLevel: user.classLevel,
            avatar: user.avatar,
            totalStars: user.totalStars,
            completedGames: user.completedGames
          }
        }
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc Get Current Logged In User
// @route GET /api/auth/me
const getMe = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: {
        user: req.user
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc Logout User
// @route POST /api/auth/logout
const logoutUser = (req, res) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
  res.json({
    success: true,
    message: 'ଲଗ୍‌ଆଉଟ୍ ସମ୍ପୂର୍ଣ୍ଣ ହେଲା।'
  });
};

module.exports = { registerUser, loginUser, getMe, logoutUser };
