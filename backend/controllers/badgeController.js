const Badge = require('../models/Badge');
const UserBadge = require('../models/UserBadge');
const { getIsConnected, memoryStore } = require('../config/database');

// @desc Get All System Badges
// @route GET /api/badges
const getAllBadges = async (req, res, next) => {
  try {
    if (getIsConnected()) {
      const badges = await Badge.find({ isActive: true });
      return res.json({ success: true, data: badges });
    } else {
      const badges = memoryStore.badges.filter(b => b.isActive);
      return res.json({ success: true, data: badges });
    }
  } catch (err) {
    next(err);
  }
};

// @desc Get User's Unlocked Badges
// @route GET /api/badges/me
const getMyBadges = async (req, res, next) => {
  try {
    let allBadges = [];
    let userBadges = [];

    if (getIsConnected()) {
      allBadges = await Badge.find({ isActive: true });
      userBadges = await UserBadge.find({ userId: req.user._id });
    } else {
      allBadges = memoryStore.badges.filter(b => b.isActive);
      userBadges = memoryStore.userBadges.filter(ub => ub.userId === req.user._id);
    }

    const unlockedCodes = new Set(userBadges.map(ub => ub.badgeCode));

    const result = allBadges.map(badge => {
      const bObj = badge.toObject ? badge.toObject() : { ...badge };
      return {
        ...bObj,
        unlocked: unlockedCodes.has(badge.badgeCode) || (req.user.totalStars >= 10 && badge.badgeCode === 'badge_first_game'),
        unlockedAt: userBadges.find(ub => ub.badgeCode === badge.badgeCode)?.unlockedAt || null
      };
    });

    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllBadges, getMyBadges };
