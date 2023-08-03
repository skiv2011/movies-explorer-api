const { statusCode } = require('../utils/errors');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Forbidden';
    this.statusCode = statusCode.FORBIDDEN;
  }
}
module.exports = ForbiddenError;
