const { celebrate, Joi } = require('celebrate');
const { REGEX_URL } = require('../../utils/constants');

module.exports.editUpdateUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});
