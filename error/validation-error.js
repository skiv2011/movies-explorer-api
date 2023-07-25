const { statusCode } = require('../utils/errors');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequest';
    this.statusCode = statusCode.BAD_REQUEST;
  }
}

module.exports = ValidationError;