const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'କିଛି ଅସୁବିଧା ହେଲା। ଦୟାକରି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।';

  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'ଅବୈଧ ଆଇଡି (ID) ପ୍ରଦାନ କରାଯାଇଛି।';
  } else if (err.code === 11000) {
    statusCode = 400;
    message = 'ଏହି ଇମେଲ୍ ବା ତଥ୍ୟ ପୂର୍ବରୁ ପଞ୍ଜୀକୃତ ଅଛି।';
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    error: err.name || 'SERVER_ERROR'
  });
};

const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `ପୃଷ୍ଠା କିମ୍ବା ଆପିଆଇ ମିଳିଲା ନାହିଁ - ${req.originalUrl}`,
    error: 'NOT_FOUND'
  });
};

module.exports = { errorHandler, notFound };
