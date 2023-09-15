const jwt = require('jsonwebtoken');
const AuthDataError = require('../error/auth-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    next(new AuthDataError('Необходима авторизация.'));
    return;
  }

  let payload;
  try {
    // eslint-disable-next-line no-undef
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    req.user = payload;
    next();
  } catch (err) {
    next(new AuthDataError('Необходима авторизация.'));
  }
};

module.exports = { auth };
