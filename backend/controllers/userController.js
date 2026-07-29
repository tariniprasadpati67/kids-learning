const User = require('../models/User');

// @desc Get User Profile
// @route GET /api/users/me
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-passwordHash');
    res.json({
      success: true,
      data: { user }
    });
  } catch (err) {
    next(err);
  }
};

// @desc Update Profile (Name, ClassLevel, Avatar)
// @route PATCH /api/users/me
const updateUserProfile = async (req, res, next) => {
  try {
    const { name, classLevel, avatar } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'ଉପଭୋକ୍ତା ମିଳିଲା ନାହିଁ।',
        error: 'USER_NOT_FOUND'
      });
    }

    if (name) user.name = name.trim();
    if (classLevel && classLevel >= 1 && classLevel <= 5) user.classLevel = classLevel;
    if (avatar) user.avatar = avatar;

    await user.save();

    res.json({
      success: true,
      message: 'ପ୍ରୋଫାଇଲ୍ ସଫଳତାର ସହ ଅପଡେଟ୍ ହେଲା!',
      data: { user }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getUserProfile, updateUserProfile };
