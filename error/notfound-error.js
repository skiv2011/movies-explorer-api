const { statusCode } = require('../utils/errors');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFound';
    this.statusCode = statusCode.NOT_FOUND;
  }
}
module.exports = NotFoundError;
