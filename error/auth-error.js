const { statusCode } = require('../utils/errors');

class AuthDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized';
    this.statusCode = statusCode.UNAUTHORIZED;
  }
}
module.exports = AuthDataError;
