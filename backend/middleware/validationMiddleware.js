const validateRegister = (req, res, next) => {
  const { name, email, password, classLevel } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: 'ଦୟାକରି ଆପଣଙ୍କ ନାମ ଦିଅନ୍ତୁ',
      error: 'VALIDATION_FAILED'
    });
  }

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'ଇମେଲ୍ ଠିକ୍ ନୁହେଁ',
      error: 'VALIDATION_FAILED'
    });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'ପାସୱାର୍ଡ ଅତିକମରେ ୬ଟି ଅକ୍ଷର ହେବା ଆବଶ୍ୟକ',
      error: 'VALIDATION_FAILED'
    });
  }

  const cls = parseInt(classLevel, 10);
  if (isNaN(cls) || cls < 1 || cls > 5) {
    return res.status(400).json({
      success: false,
      message: 'ଶ୍ରେଣୀ ୧ ରୁ ୫ ମଧ୍ୟରେ ହେବା ଆବଶ୍ୟକ',
      error: 'VALIDATION_FAILED'
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'ଇମେଲ୍ ଠିକ୍ ନୁହେଁ',
      error: 'VALIDATION_FAILED'
    });
  }

  if (!password || !password.trim()) {
    return res.status(400).json({
      success: false,
      message: 'ପାସୱାର୍ଡ ଦିଅନ୍ତୁ',
      error: 'VALIDATION_FAILED'
    });
  }

  next();
};

module.exports = { validateRegister, validateLogin };
