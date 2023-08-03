const { statusCode } = require('../utils/errors');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Conflict';
    this.statusCode = statusCode.CONFLICT;
  }
}
module.exports = ConflictError;
