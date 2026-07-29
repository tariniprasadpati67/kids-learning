const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'ଏହି ପୃଷ୍ଠା ବା ଅପରେସନ୍ ପାଇଁ ଆଡମିନ୍ ଅଧିକାର ଆବଶ୍ୟକ।',
      error: 'FORBIDDEN_ADMIN_ONLY'
    });
  }
};

module.exports = { requireAdmin };
