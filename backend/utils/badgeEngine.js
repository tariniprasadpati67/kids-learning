const Badge = require('../models/Badge');
const UserBadge = require('../models/UserBadge');

const checkAndAwardBadges = async (user, attemptData, subjectName) => {
  const newlyUnlocked = [];

  try {
    const allBadges = await Badge.find({ isActive: true });
    const userBadges = await UserBadge.find({ userId: user._id });
    const unlockedCodes = new Set(userBadges.map(b => b.badgeCode));

    for (const badge of allBadges) {
      if (unlockedCodes.has(badge.badgeCode)) continue;

      let shouldUnlock = false;

      switch (badge.requirementType) {
        case 'first_game':
          if (user.completedGames >= 1) shouldUnlock = true;
          break;
        case 'total_stars':
          if (user.totalStars >= badge.requirementValue) shouldUnlock = true;
          break;
        case 'completed_games':
          if (user.completedGames >= badge.requirementValue) shouldUnlock = true;
          break;
        case 'perfect_quiz':
          if (attemptData && attemptData.percentage >= 100) shouldUnlock = true;
          break;
        case 'subject_completed':
          if (subjectName && subjectName.toLowerCase().includes(badge.badgeCode.includes('math') ? 'math' : 'odia')) {
            shouldUnlock = true;
          }
          break;
      }

      if (shouldUnlock) {
        await UserBadge.create({
          userId: user._id,
          badgeId: badge._id,
          badgeCode: badge.badgeCode,
          unlockedAt: new Date()
        });

        newlyUnlocked.push({
          badgeCode: badge.badgeCode,
          name: badge.name,
          odiaName: badge.odiaName,
          description: badge.description,
          icon: badge.icon
        });
      }
    }
  } catch (err) {
    console.error('[BadgeEngine Error]', err);
  }

  return newlyUnlocked;
};

module.exports = { checkAndAwardBadges };
