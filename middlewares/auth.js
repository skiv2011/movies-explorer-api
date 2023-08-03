const jwt = require('jsonwebtoken');
const AuthDataError = require('../error/auth-error');

const auth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    next(new AuthDataError('Необходима авторизация.'));
    return;
  }

  let payload;
  try {
    payload = jwt.verify(token, 'dev-secret');
    req.user = payload;
    next();
  } catch (err) {
    next(new AuthDataError('Необходима авторизация.'));
  }
};

module.exports = { auth };
